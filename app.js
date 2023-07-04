let operation = null;
let firstOperand = null;
let secondOperand = null;
let shouldClearScreen = false;
let clearAll = false;

function add(num1, num2){
    return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2){
    return parseInt(num1) - parseInt(num2);
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(num1, num2, operator){
    if(operator == '+'){
        return add(num1, num2);
    }
    if(operator == '-'){
        return subtract(num1, num2);
    }
    if(operator == '*'){
        return multiply(num1, num2);
    }
    if(operator == '/'){
        return divide(num1, num2);
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.getElementById('Equal');
const clearButton = document.getElementById('Clear');
const backButton = document.getElementById('Back');
const lastDisplay = document.getElementById('display-last')
const currentDisplay = document.getElementById('display-current');

window.addEventListener('keydown', handleKeys);

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clearFullScreen);


function appendNumber(number){
    if(shouldClearScreen == true || currentDisplay.textContent == '0'){
        clearScreen();
    }
    currentDisplay.textContent += number;
}

function setOperation(operator){
    if (operation != null){
        evaluate();
    }
    operation = operator;
    firstOperand = currentDisplay.textContent;
    lastDisplay.textContent = `${firstOperand} ${operation}`;
    shouldClearScreen = true;
}

function clearFullScreen(){
    currentDisplay.textContent = '';
    lastDisplay.textContent = '';
    operation = null;
    shouldClearScreen = false;
}

function clearScreen(){
    currentDisplay.textContent = '';
    shouldClearScreen = false;
}

function evaluate(){
    secondOperand = currentDisplay.textContent;
    lastDisplay.textContent = `${firstOperand} ${operation} ${secondOperand}` + " =";
    currentDisplay.textContent = operate(firstOperand, secondOperand, operation);
    firstOperand = currentDisplay.textContent;
    operation = null;
}

function handleKeys(e){
    if ((e.key >= 0 && e.key <= 9) || e.key == '.') appendNumber(e.key);
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Escape') clearFullScreen();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(e.key);
}