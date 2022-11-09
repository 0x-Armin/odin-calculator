const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
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

function updateDisplay() {
  let node = document.createTextNode(displayStr);
  if (displayPanel.childNodes.length > 0) displayPanel.removeChild(displayPanel.lastChild);
  displayPanel.appendChild(node);
}

function updateStr(inputStr) {
  displayStr = displayStr.concat(inputStr);
  console.log(displayStr);
}

function receiveInput() {
  updateStr(this.textContent);
  updateDisplay();
}

let displayStr = "";
const displayPanel = document.getElementById('display');

const opBtns = Array.from(document.querySelectorAll('.number, .operator'));
opBtns.forEach((opBtn) => opBtn.addEventListener('click', receiveInput));