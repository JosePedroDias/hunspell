var fs     = require('fs'),
    stream = require('stream'),
    byline = require('byline'); // npm install byline



var convert_aff_dic = function(affPath, dicPath, cb) {
    var aff = {},
        dic = [],
        lineNum = 1;



    // AFF PARSING
    var affStream = byline( fs.createReadStream(affPath, {encoding:'utf8'}));
    console.log('Processing aff file %s...', affPath);
    affStream.on('error', function() {
        console.error('Error in aff file %s line number %d', affPath, lineNum);
    });
    affStream.on('data', function(line) {
        //console.log(line);

        var parts = line.split(/\s+/);
        var cmd = parts.shift().toLowerCase();
        var cmdBag = aff[cmd];
        if (!cmdBag) {
            cmdBag = [];
            aff[cmd] = cmdBag;
        }

        cmdBag.push(parts);

        ++lineNum;
    });
    affStream.on('end', function() {

        lineNum = 1;

        // DIC PARSING
        console.log('Processing dic file %s...', dicPath);
        var dicStream = byline( fs.createReadStream(dicPath, {encoding:'utf8'}));
        dicStream.on('error', function() {
            console.error('Error in dic file %s line number %d', dicPath, lineNum);
        });
        dicStream.on('data', function(line) {
            //console.log(line);

            if (lineNum !== 1) { // ignore word count line
                var parts = line.split(/(\s+)|\//);
                var end;

                if (parts.length === 5) {
                    end = parts[4];
                    end = end.substring(1, end.length - 1);
                    parts = [parts[0], parts[2], end];
                }
                else { // 3?
                    end = parts[2];
                    end = end.substring(1, end.length - 1);
                    parts = [parts[0], '', end];
                }

                dic.push(parts);
            }

            ++lineNum;
        });
        dicStream.on('end', function() {
            cb(null, {aff:aff, dic:dic});
        });
    });
};



module.exports = convert_aff_dic;
