import {freqJson} from '../../data/wordFreqJson.js';

export function getLMProbability(str) {
    let regexp = new RegExp(`^${str}`)
    return freqJson[str[0]].filter((v) => v.word===str);
}