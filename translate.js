let TJO = require('translate-json-object')();
let sg = require('surrog8');
let fs = require('fs');
let config = require('./config.json');

let tjoConfig = {};
if (typeof config.googleApiKey !== 'undefined' && config.googleApiKey !== ''){
    tjoConfig['googleApiKey'] = config.googleApiKey;
}
if (config.yandexApiKey !== 'undefined' && config.yandexApiKey !== ''){
    tjoConfig['yandexApiKey'] = config.yandexApiKey;
}

if (Object.entries(tjoConfig).length === 0){
    console.log('Error! You must have a Google API Key or Yandex API Key defined in your config!');
    process.exit(1);
}

TJO.init(tjoConfig);

let translateThis = require('./translatethis.json');

function strMapToObj(strMap) {
    let obj = Object.create(null);
    let mapKeys = Array.from(strMap.keys()).sort(function(a, b){
        if (!isNaN(a) && !isNaN(b)){
            let intA = parseInt(a);
            let intB = parseInt(b);
            if (intA < intB) return -1;
            if (intA > intB) return 1;
            return 0;
        }
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    for(let key in mapKeys){
        obj[mapKeys[key]] = strMap.get(mapKeys[key]);
    }
    return obj;
}

function convertAllJsonSurrogatePairs(tree){
    // Both arrays and objects will be an "object"
    if (typeof tree === 'object') {
        let isArray = Array.isArray(tree);
        let nest = (isArray ? [] : new Map());
        for (let i in tree) {
            if (isArray){
                nest[i] = convertAllJsonSurrogatePairs(tree[i]);
                continue;
            }
            let item = (!isNaN(i) ? parseInt(i) : i);
            nest.set(item, convertAllJsonSurrogatePairs(tree[i]));
        }
        return strMapToObj(nest);
    }
    else{
        return sg.uHHHH(tree);
    }
}

async function translateAllLanguages(){
    fs.mkdir('./translations', () => {});
    for(let i in config.translateLanguages) {
        let translations = await TJO.translate(translateThis, config.translateLanguages[i]);
        let convertedData = convertAllJsonSurrogatePairs(translations);
        await fs.writeFile('./translations/translated_'+config.translateLanguages[i]+'.json',
            JSON.stringify(convertedData),
            function(err){
            if (err){
                return console.log(err);
            }
        });
    }
}

translateAllLanguages().catch(err => console.log('error ', err));