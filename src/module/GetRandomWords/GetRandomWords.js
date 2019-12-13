import { phrases } from './phraseSet.js';
import { selectedPhrases } from './selectedPhraseSet.js';

export function getRandomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

let sph = selectedPhrases.slice(0);
export function getRandomSelectedPhrase() {
  if (sph.length === 0) {
    sph = selectedPhrases.slice(0);
  }
  const id = Math.floor(Math.random() * sph.length);
  const res = sph[id];
  sph.splice(id, 1);
  // console.log(selectedPhrases.length)
  // console.log(sph.length)
  return res;
}
