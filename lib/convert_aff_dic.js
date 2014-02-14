var fs     = require('fs'),
    stream = require('stream'),
    byline = require('byline'); // npm install byline



var convert_aff_dic = function(affPath, dicPath, cb) {
    var aff = {},
        dic = [];



    // AFF
    var affStream = byline( fs.createReadStream(affPath, {encoding:'utf8'}));
    console.log('Processing aff file %s...', affPath);
    affStream.on('error', function() {
        console.log('ERROR!');
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
    });
    affStream.on('end', function() {

        var isFirstLine = true;

        //DIC
        console.log('Processing dic file %s...', dicPath);
        var dicStream = byline( fs.createReadStream(dicPath, {encoding:'utf8'}));
        dicStream.on('error', function() {
            console.log('ERROR!');
        });
        dicStream.on('data', function(line) {
            //console.log(line);
            //dic.push(line);

            if (isFirstLine) {
                isFirstLine = false; // ignore word count line
            }
            else {
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
        });
        dicStream.on('end', function() {
            cb(null, {aff:aff, dic:dic});
        });
    });
};



module.exports = convert_aff_dic;
