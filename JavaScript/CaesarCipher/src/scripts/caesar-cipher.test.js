import { encrypt, decrypt } from "./caesar-cipher.js";

test("caesar cipher with positive key", () => {
  expect(encrypt("abc", 1)).toBe("BCD");
});

test("caesar cipher with negative key", () => {
  expect(encrypt("bcd", -1)).toBe("ABC");
});

test("caesar cipher with key greater than 26", () => {
  expect(encrypt("abc", 27)).toBe("BCD");
});

test("caesar cipher with key less than -26", () => {
  expect(encrypt("bcd", -27)).toBe("ABC");
});

test("caesar cipher with spaces and punctuation", () => {
  expect(encrypt("hello, world!", 3)).toBe("KHOOR, ZRUOG!");
});

test("caesar cipher with uppercase letters", () => {
  expect(encrypt("abc", 0)).toBe("ABC");
});

test("caesar cipher with numbers", () => {
  expect(encrypt("abc123", 1)).toBe("BCD123");
});

test("caesar cipher with special characters", () => {
  expect(encrypt("abc@#$", 1)).toBe("BCD@#$");
});

test("caesar cipher with empty string", () => {
  expect(encrypt("", 1)).toBe("");
});

// test decrypting

test("caesar cipher decrypt with positive key", () => {
  expect(decrypt("BCD", 1)).toBe("abc");
});

test("caesar cipher decrypt with negative key", () => {
  expect(decrypt("ABC", -1)).toBe("bcd");
});

test("caesar cipher decrypt with key greater than 26", () => {
  expect(decrypt("BCD", 27)).toBe("abc");
});

test("caesar cipher decrypt with key less than -26", () => {
  expect(decrypt("ABC", -27)).toBe("bcd");
});

test("caesar cipher decrypt with spaces and punctuation", () => {
  expect(decrypt("KHOOR, ZRUOG!", 3)).toBe("hello, world!");
});

test("caesar cipher decrypt with uppercase letters", () => {
  expect(decrypt("ABC", 0)).toBe("abc");
});

test("caesar cipher decrypt with numbers", () => {
  expect(decrypt("BCD123", 1)).toBe("abc123");
});

test("caesar cipher decrypt with special characters", () => {
  expect(decrypt("BCD@#$", 1)).toBe("abc@#$");
});

test("caesar cipher decrypt with empty string", () => {
  expect(decrypt("", 1)).toBe("");
});

test("caesar cipher with non-string input", () => {
  expect(() => encrypt(123, 1)).toThrow("Input must be a string");
  expect(() => decrypt(123, 1)).toThrow("Input must be a string");
});

test("caesar cipher with non-number key", () => {
  expect(() => encrypt("abc", "a")).toThrow("Key must be a number");
  expect(() => decrypt("abc", "a")).toThrow("Key must be a number");
});
