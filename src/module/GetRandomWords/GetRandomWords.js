import { phrases } from "./phraseSet.js";

export function getRandomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}
