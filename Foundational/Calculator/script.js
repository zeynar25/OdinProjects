function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  if (operator === "+") {
    return add(x, y);
  } else if (operator === "-") {
    return subtract(x, y);
  } else if (operator === "*") {
    return multiply(x, y);
  } else if (operator === "/") {
    return divide(x, y);
  } else {
    return "Invalid operator";
  }
}

function handleEqualClick(operator, x, y) {
  const answer = operate(operator, firstNumber, secondNumber);
  display.textContent = answer;
  isAnswered = true;
}

function handleOperatorClick(e) {
  if (operator !== "" && secondNumber !== 0) {
    handleEqualClick(operator, firstNumber, secondNumber);
    firstNumber = parseInt(display.textContent);

    operator = e.target.textContent;
    display.textContent += operator;
    secondNumber = 0;
  } else if (operator !== "" && secondNumber === 0) {
    let currentDisplay = display.textContent;
    // removes the current operator on the display and resplaces it with the new operator
    currentDisplay = currentDisplay.slice(0, -1);
    display.textContent = currentDisplay;

    operator = e.target.textContent;
    display.textContent += operator;
  } else {
    operator = e.target.textContent;
    display.textContent += operator;
  }
}

function handleClearClick(e) {
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  display.textContent = "0";
}

function handleNumberClick(e) {
  if (isAnswered) {
    handleClearClick();
    isAnswered = false;
  }

  const number = e.target.textContent;
  if (operator === "") {
    firstNumber = parseInt(firstNumber.toString() + number);
  } else {
    secondNumber = parseInt(secondNumber.toString() + number);
  }

  if (display.textContent === "0") {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}

const display = document.querySelector("#display");

let firstNumber = 0;
let secondNumber = 0;
let operator = "";

let isAnswered = false;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorClick);
});

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  handleEqualClick(operator, firstNumber, secondNumber);
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", handleClearClick);
