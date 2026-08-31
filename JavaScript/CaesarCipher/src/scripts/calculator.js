export default class Calculator {
  constructor() {
    this.result = 0;
  }

  add(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new Error("Inputs must be numbers");
    }
    this.result = a + b;
    return this.result;
  }

  subtract(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new Error("Inputs must be numbers");
    }
    this.result = a - b;
    return this.result;
  }

  divide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new Error("Inputs must be numbers");
    }
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.result = a / b;
    return this.result;
  }

  multiply(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new Error("Inputs must be numbers");
    }
    this.result = a * b;
    return this.result;
  }
}
