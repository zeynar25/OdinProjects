import capitalize from "./capitalize.js";

export default function caesarCipher(str, key) {
  key %= 26;
  let result = "";

  let capitalizedStr = str.toUpperCase();

  for (const char of capitalizedStr) {
    result += isLetter(char) ? shiftChar(char, key) : char;
  }

  return result;
}

function isLetter(char) {
  return char.toLowerCase() !== char.toUpperCase();
}

function shiftChar(char, key) {
  // Determine the base ASCII code for uppercase or lowercase letters
  const base = char === char.toUpperCase() ? 65 : 97;

  // char.charCodeAt(0) - base gives the position of the character in the alphabet (0-25)
  const shiftedCode = ((char.charCodeAt(0) - base + key + 26) % 26) + base;

  return String.fromCharCode(shiftedCode);
}
