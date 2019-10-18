import { freqJson } from "./wordFreqJson.js";

export function getLMProbability(str) {
  return freqJson[str[0]].filter(v => v.word === str);
}
