const fs = require('fs');

let jsonObject = JSON.parse(fs.readFileSync('data/wpmData.json', 'utf8'));
let result = {};

// console.log(jsonObject);

let nameList = ['nanri', 'sabu', 'yutaro', 'mano'];

let arr = [];
for (let i = 0; i < 5; i++) {
  arr[i] = '';
  nameList.filter(name => {
    // jsonObject.peripheral[name].filter(data => {
    arr[i] += jsonObject.invisible[name][i].toString();
    // console.log(jsonObject.peripheral[name][i]);
    // });
    name !== 'mano' && (arr[i] += ',');
  });
}
// arr = arr.map(v0 => {
//   return v0.reduce((sum, v) => sum + v) / 4;
// });

arr.filter(v => {
  console.log(v);
});
