const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const divisionByZeroErr = "ERROR! Division by zero";

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
      if (b === 0) return divisionByZeroErr;
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

  if (operations[operations.length-1] === "" ||  isNaN(operations[operations.length-1])) {
    displayStr = "ERROR! Incomplete input!";
    return;
  }

  let currValue = 0;

  for (let i=0; i<operations.length; i+=2) {
    currValue = operate(operations[i], currValue, operations[i+1]);
    if (currValue === divisionByZeroErr) break;
  }

  return currValue;
}

function getAnswer() {
  let ans = compute();

  if (
    typeof ans === 'number' &&
    !Number.isNaN(ans) &&
    !Number.isInteger(ans)
  ) { displayStr = ans.toFixed(6) } 
  else if (Number.isInteger(ans)) { displayStr = ans.toString() }
  else if (ans === divisionByZeroErr) {displayStr = ans; }

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