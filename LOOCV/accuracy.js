const fs = require('fs');

let jsonObject = JSON.parse(fs.readFileSync('wordAccuracy.json', 'utf8'));

sum = 0;
Object.keys(jsonObject).filter(k => {
  sum += jsonObject[k];
});
console.log(sum / 10000);
