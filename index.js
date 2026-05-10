//Variables
const container = document.getElementById("button-container");
const result = document.getElementById("screen");

let num1 = "";
let num2 = "";
let operator = "";
let operatorPressed = false;


function handleInput(value) {
    if (!isNaN(value)) {
        if (!operatorPressed) {
            num1 += value;
            result.value = num1;
        } else {
            num2 += value;
            result.value = num2;
        }
    } else if (["+", "-", "*", "/"].includes(value)) {
        operator = value;
        operatorPressed = true;

    } else if (value === "=") {
        let res;
        if (operator === "+") res = add(+num1, +num2);
        else if (operator === "-") res = subtract(+num1, +num2);
        else if (operator === "*") res = multiply(+num1, +num2);
        else if (operator === "/") res = divide(+num1, +num2);
        result.value = res;
    } else if (value === "c") {
        result.value = "";
        num1 = "";
        num2 = "";
        operator = "";
        operatorPressed = false;
    } else if (value === "del") {
        if (operatorPressed) {
            num2 = num2.slice(0, -1)
            result.value = num2 || "0";
        } else {
            num1 = num1.slice(0, -1)
            operatorPressed = false;
            result.value = num1 || "0";
        }
    }
}

container.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;
    const value = e.target.value;
    handleInput(e.target.value);

})

const keyMap = {
    // Números (coinciden directamente, se pueden incluir o dejar por defecto)
    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
    "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
    ".": ".",

    // Operadores (coinciden directamente)
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",

    // Mapeo especial
    "Enter": "=",
    "=": "=",
    "Backspace": "del",
    "Escape": "c",
    "Delete": "c" // Opcional: usar Supr también para limpiar
};



document.addEventListener("keydown", (e) => {
    const key = e.key;
    const mappedValue = keyMap[key];

    if(mappedValue) {
        e.preventDefault();
        handleInput(mappedValue);

    }
})

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}