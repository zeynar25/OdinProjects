function encrypt(str, key) {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }

  if (typeof key !== "number") {
    throw new Error("Key must be a number");
  }

  key %= 26;
  let result = "";

  for (const char of str.toUpperCase()) {
    result += isLetter(char) ? shiftChar(char, key) : char;
  }

  return result;
}

function decrypt(str, key) {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }

  if (typeof key !== "number") {
    throw new Error("Key must be a number");
  }

  key %= 26;
  key = -key;
  let result = "";

  for (const char of str.toLowerCase()) {
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

export { encrypt, decrypt };
