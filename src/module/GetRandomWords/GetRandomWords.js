import { phrases } from './phraseSet.js';
import { selectedPhrases } from './selectedPhraseSet.js';

let ph = phrases.slice(0);
export function getRandomPhrase() {
  if (ph.length === 0) {
    ph = phrases.slice(0);
  }
  const id = Math.floor(Math.random() * ph.length);
  const res = ph[id];
  ph.splice(id, 1);
  // return phrases[Math.floor(Math.random() * phrases.length)];
  return res;
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
