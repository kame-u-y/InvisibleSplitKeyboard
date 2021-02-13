const fs = require('fs');

const jsonObject = JSON.parse(fs.readFileSync('output.json', 'utf8'));

Object.keys(jsonObject).filter((v) => {
    console.log(Object.keys(jsonObject[v]));
});