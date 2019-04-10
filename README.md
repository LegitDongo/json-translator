# json-translator
### Convert contents of a JSON file into locales of choice with escaped unicode surrogate pairs

!! Keep in mind this project doesn't completely work !!

There are still some things to work out regarding order and escaping (e.g. `\\` where there should be one slash)

I also can't work on this anymore since Google decided that my API usage needs to be limited.

This is still useful if you don't mind these things, though

## Install
`npm install`

## Edit
1. Copy `config.json.example` to `config.json` and fill appropriately
    * You can have one or both types of API keys, but will default to Yandex when both are specified
2. Copy `translatethis.json.example` to `translatethis.json` and fill in with the json you want to translate

For a list of languages and the corresponding code: [Google API](https://cloud.google.com/translate/docs/languages) | 
[Yandex API](https://tech.yandex.com/translate/doc/dg/concepts/api-overview-docpage/)

You will want to put the language code into your config. 

## Run
`node translate.js`

## Profit
Find your translations in the `translations` folder, one file per translation provided in the config

### Credit
This project is built on top of [surrog8](https://github.com/mk-pmb/surrog8-node) and 
[translate-json-object](https://github.com/KhaledMohamedP/translate-json-object)

Be sure to give them some love ❤

If you like this, you can [buy me a beer 🍻](https://ko-fi.com/Z8Z3AVDQ)