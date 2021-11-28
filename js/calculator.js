function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return (b == 0 ? "moron" : a / b);
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            break;
    }
}

const currentOpScreen = document.querySelector("#currentOp");
const resultScreen = document.querySelector("#result");
const numberButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");
const deleteButton = document.querySelector("#delete");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal")

let firstNumber;
let operator = "";
let deleteResultScreen = false;
let operatorPushed = false;

function deleteEvent() {
    resultScreen.textContent = resultScreen.textContent.substring(0, resultScreen.textContent.length -1);
}

function clearEvent() {
    operator = "";
    firstNumber = 0;
    deleteResultScreen = false;
    operatorPushed = false;
    resultScreen.textContent = ""
    currentOpScreen.textContent = ""
}

function operatorEvent(button) {
    if (button.textContent == "*") {
        button.textContent = "x";
    }
    if (operatorPushed) {
        let result = operate(operator, firstNumber, resultScreen.textContent);
        operator = button.textContent;
        firstNumber = result;
        resultScreen.textContent = result;
        currentOpScreen.textContent = firstNumber + " " + operator;
        deleteResultScreen = true;
    } else {
        deleteResultScreen = true;
        firstNumber = resultScreen.textContent;
        operator = button.textContent;
        currentOpScreen.textContent = firstNumber + " " + operator;
        operatorPushed = true;
    }
}

function numberEvent(button) {
    if (deleteResultScreen) {
        result.textContent = "";
        deleteResultScreen = false;
    }
    if (button.textContent != "." || !(resultScreen.textContent.includes("."))) {
        resultScreen.textContent += button.textContent;

    }
}

function equalEvent() {
    let result = operate(operator, firstNumber, resultScreen.textContent);
    currentOpScreen.textContent = firstNumber + " " + operator + " " + resultScreen.textContent + " = " ;
    resultScreen.textContent = result;
    deleteResultScreen = true;
    operatorPushed = false;
}

function keydownEvent(e) {
    button = document.createElement("button");
    button.textContent = e.key;
    if (!(isNaN(e.key)) || e.key == ".") {
        numberEvent(button);
    } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
        operatorEvent(button);
    } else if (e.key == "Enter") {
        equalEvent();
    } else if (e.key == "Backspace")
        deleteEvent();
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        numberEvent(button);
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operatorEvent(button);
    })
})

clearButton.addEventListener('click', () => {
    clearEvent();
})

deleteButton.addEventListener('click', () => {
    deleteEvent();
})

equalButton.addEventListener('click', () => {
    equalEvent();
})
window.addEventListener('keydown', keydownEvent);
