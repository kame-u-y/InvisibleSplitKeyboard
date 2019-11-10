import { freqJson } from './wordFreqJson.js';

export function getLMProbability(str) {
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
}
