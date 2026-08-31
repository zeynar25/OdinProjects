import Calculator from "./calculator";

let calculator;
beforeEach(() => {
  calculator = new Calculator();
});

test("object is an instance of Calculator", () => {
  expect(calculator).toBeInstanceOf(Calculator);
});

test("initial result is 0", () => {
  expect(calculator.result).toBe(0);
});

test("adds 1 + 2 to equal 3", () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test("throws error when adding non-number inputs", () => {
  expect(() => calculator.add("1", 2)).toThrow("Inputs must be numbers");
});

test("subtracts 5 - 2 to equal 3", () => {
  expect(calculator.subtract(5, 2)).toBe(3);
});

test("throws error when subtracting non-number inputs", () => {
  expect(() => calculator.subtract(5, "2")).toThrow("Inputs must be numbers");
});

test("divides 10 / 2 to equal 5", () => {
  expect(calculator.divide(10, 2)).toBe(5);
});

test("throws error when dividing by zero", () => {
  expect(() => calculator.divide(10, 0)).toThrow("Cannot divide by zero");
});

test("throws error when dividing non-number inputs", () => {
  expect(() => calculator.divide(10, "2")).toThrow("Inputs must be numbers");
});

test("multiplies 3 * 4 to equal 12", () => {
  expect(calculator.multiply(3, 4)).toBe(12);
});

test("throws error when multiplying non-number inputs", () => {
  expect(() => calculator.multiply(3, "4")).toThrow("Inputs must be numbers");
});
