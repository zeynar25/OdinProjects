import caesarCipher from "./caesar-cipher.js";

test("caesar cipher with positive key", () => {
  expect(caesarCipher("abc", 1)).toBe("BCD");
});

test("caesar cipher with negative key", () => {
  expect(caesarCipher("bcd", -1)).toBe("ABC");
});

test("caesar cipher with key greater than 26", () => {
  expect(caesarCipher("abc", 27)).toBe("BCD");
});

test("caesar cipher with key less than -26", () => {
  expect(caesarCipher("bcd", -27)).toBe("ABC");
});

test("caesar cipher with spaces and punctuation", () => {
  expect(caesarCipher("hello, world!", 3)).toBe("KHOOR, ZRUOG!");
});

test("caesar cipher with uppercase letters", () => {
  expect(caesarCipher("abc", 0)).toBe("ABC");
});

test("caesar cipher with numbers", () => {
  expect(caesarCipher("abc123", 1)).toBe("BCD123");
});

test("caesar cipher with special characters", () => {
  expect(caesarCipher("abc@#$", 1)).toBe("BCD@#$");
});
