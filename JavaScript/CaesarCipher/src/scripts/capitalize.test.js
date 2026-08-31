import capitilize from "./capitalize";

test("capitalize first letter of string", () => {
  expect(capitilize("hello")).toBe("Hello");
});

test("capitalize first letter of string with spaces", () => {
  expect(capitilize("hello world")).toBe("Hello world");
});

test("capitalize first letter of string with punctuation", () => {
  expect(capitilize("hello!")).toBe("Hello!");
});

test("capitalize first letter of string with numbers", () => {
  expect(capitilize("hello123")).toBe("Hello123");
});

test("capitalize first letter of string with special characters", () => {
  expect(capitilize("hello@world")).toBe("Hello@world");
});

test("send a string with first letter as a number", () => {
  expect(capitilize("1hello")).toBe("1hello");
});

test("send a number instead of a string", () => {
  expect(() => capitilize(123)).toThrow("Input must be a string");
});
