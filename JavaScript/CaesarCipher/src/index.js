import "./styles.css";
import { encrypt, decrypt } from "./scripts/caesar-cipher.js";

const shiftInput = document.getElementById("shift");
const plainText = document.getElementById("plain-text");
const cipherText = document.getElementById("cipher-text");

const encryptForm = document.getElementById("encrypt-form");
const decryptForm = document.getElementById("decrypt-form");

encryptForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const shift = parseInt(shiftInput.value);
  const text = plainText.value;

  console.log(`Encrypting: ${text} with shift: ${shift}`);
  let encryptedText = encrypt(text, shift);

  console.log(`Encrypted text: ${encryptedText}`);
  cipherText.value = encryptedText;
});

decryptForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const shift = parseInt(shiftInput.value);
  const text = cipherText.value;

  console.log(`Decrypting: ${text} with shift: ${shift}`);
  let decryptedText = decrypt(text, shift);

  console.log(`Decrypted text: ${decryptedText}`);
  plainText.value = decryptedText;
});
