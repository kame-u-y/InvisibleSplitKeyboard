const fs = require('fs');

let jsonObject = JSON.parse(
  fs.readFileSync('./top1/wordAccuracy-normal-2.json', 'utf8')
);

sum = 0;
Object.keys(jsonObject).filter(k => {
  sum += jsonObject[k];
});
console.log(sum / 10000);
