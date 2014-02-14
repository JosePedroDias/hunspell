Attempting to parse hunspell dictionaries to use a source of knowledge



# Resources

## Source of the hunspell portuguese dictionaries:

[projecto natura @ univ. minho](http://natura.di.uminho.pt/wiki/doku.php?id=dicionarios:main#hunspell)



## Hunspell format explained:

[hunspell -  format of Hunspell dictionaries and affix files](http://pwet.fr/man/linux/fichiers_speciaux/hunspell)



# Usage (so far)

    bin/hunspell_to_json sample_in/pt_PT.aff sample_in/pt_PT.dic sample_out/pt_PT.json

The JSON format may be revised to reduce size or optimize search... This is an early attempt.

I'm not storing the JSON files in `sample_out` or updating the dictionaries in `sample_in` to save git storage O:)

If this ever gets successful I may serve them elsewhere.
