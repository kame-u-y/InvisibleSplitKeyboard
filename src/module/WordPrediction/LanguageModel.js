import { freqJson } from './wordFreqJson.js';

export function getLMProbability(str) {
  const rambda = 0.9999999995;
  let res = freqJson[str[0]].find(v => v.word === str);
  if (res) {
    res = Number(res.ratio) * rambda;
  } else {
    console.log(Number(freqJson.total));
    console.log(1 - rambda);
    res = {
      word: str,
      ratio: (1 - rambda) * (1 / Number(freqJson.total))
    };
  }
  return res;
}
