import analyzeArray from "./analyze-array.js";

test("analyze array with positive numbers", () => {
  const arr = [1, 2, 3, 4, 5];
  const result = analyzeArray(arr);
  expect(result.length).toBe(5);
  expect(result.average).toBe(3);
  expect(result.min).toBe(1);
  expect(result.max).toBe(5);
});

test("analyze array with negative numbers", () => {
  const arr = [-1, -2, -3, -4, -5];
  const result = analyzeArray(arr);
  expect(result.length).toBe(5);
  expect(result.average).toBe(-3);
  expect(result.min).toBe(-5);
  expect(result.max).toBe(-1);
});

test("analyze array with mixed numbers", () => {
  const arr = [-1, 0, 1, 2, 3];
  const result = analyzeArray(arr);
  expect(result.length).toBe(5);
  expect(result.average).toBe(1);
  expect(result.min).toBe(-1);
  expect(result.max).toBe(3);
});

test("analyze array with single number", () => {
  const arr = [42];
  const result = analyzeArray(arr);
  expect(result.length).toBe(1);
  expect(result.average).toBe(42);
  expect(result.min).toBe(42);
  expect(result.max).toBe(42);
});

test("analyze array with empty array", () => {
  const arr = [];
  const result = analyzeArray(arr);
  expect(result.length).toBe(0);
  expect(result.average).toBe(NaN);
  expect(result.min).toBe(Infinity);
  expect(result.max).toBe(-Infinity);
});
