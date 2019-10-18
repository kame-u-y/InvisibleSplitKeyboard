import { freqJson } from './wordFreqJson.js';

export function getLMProbability(str) {
  const rambda = 0.95;
  let res = freqJson[str[0]].find(v => v.word === str);
  if (res) {
    res = Number(res.ratio) * rambda;
  } else {
    res = {
      word: str,
      ratio: (1 - rambda) * (1 / Number(freqJson.total))
    };
  }
  return res;
}
