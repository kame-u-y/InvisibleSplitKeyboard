// import { freqJson } from './wordFreqJson.js';
const { freqJson } = require('./wordFreqData/wordFreq_top10000.js');
const { checkExistanceJson } = require('./wordFreqData/checkExistance2.js');
// const {freqJson} = require()
// const fs = require('fs');
// const freqJson = JSON.parse(
//   fs.readFileSync('./wordFreqData/wordFreq_top10000.json', 'r')
// );

module.exports.getLMProbability = str => {
  // console.log(str);
  // console.log(freqJson[str[0]]);
  let res = freqJson[str[0]].find(v => v.word === str);
  if (res) {
    res = {
      value: 0.99 * Number(res.ratio),
      isKnown: true
    };
  } else {
    res = {
      value: 0.01 * (1 / Number(freqJson.total)),
      isKnown: false
    };
  }
  return res;
};

module.exports.isExistSpell = str => {
  // const isExist = (str, checkExistanceJson, n) => {
  //   if (n === str.length) {
  //     return true;
  //   }
  //   if (checkExistanceJson[str[n]]) {
  //     return isExist(str, checkExistanceJson[str[n]], n + 1);
  //   } else {
  //     return false;
  //   }
  // };
  return checkExistanceJson[str] === 'isExist';
  // reg = new RegExp(`^(${str})[a-z]*`, '');
  // checkExistanceJson[str[0]].match(reg);
};
