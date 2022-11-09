const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
  a = Number(a), b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator!";
  }
}

// receive and display user's input
function updateDisplay() {
  let node = document.createTextNode(displayStr);
  if (displayPanel.childNodes.length > 0) displayPanel.removeChild(displayPanel.lastChild);
  displayPanel.appendChild(node);
}

function updateStr(inputStr) {
  displayStr = displayStr.concat(inputStr);
}

function receiveInput() {
  updateStr(this.textContent);
  updateDisplay();
}

let displayStr = "";
const displayPanel = document.getElementById('display');

const opBtns = Array.from(document.querySelectorAll('.number, .operator'));
opBtns.forEach((opBtn) => opBtn.addEventListener('click', receiveInput));

// compute user's input
function compute() {
  let operations = displayStr.split(/([-+*\/])/);
  operations.unshift("+");
  let currValue = 0;

  for (let i=0; i<operations.length; i+=2) {
    currValue = operate(operations[i], currValue, operations[i+1]);
  }

  return currValue;
}

function getAnswer() {
  let ans = compute();
  displayStr = ans.toString();
  updateDisplay();
}

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', getAnswer);

// clear display
function clear() {
  displayStr = "";
  updateDisplay();
}

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clear);