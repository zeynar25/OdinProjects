import reverseString from "./reverse-string.js";

test("send a number instead of a string", () => {
  expect(() => reverseString(123)).toThrow("Input must be a string");
});

test("reverse a string", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("reverse a string with spaces", () => {
  expect(reverseString("hello world")).toBe("dlrow olleh");
});

test("reverse a string with punctuation", () => {
  expect(reverseString("hello!")).toBe("!olleh");
});

test("reverse a string with numbers", () => {
  expect(reverseString("hello123")).toBe("321olleh");
});
