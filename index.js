//Variables
const container = document.getElementById("button-container");
const result = document.getElementById("screen");

// Crear las variables que se usaran en las operaciones
let num1 = "";
let num2 = "";
let operator = ""; //Crea base para el operador, despues se mapeara en el mappedKeys object
let operatorPressed = false; //Checkea si se ha pulsado el operador
let justCalculated = false; //Checkea que se halla realizado una operacion hace poco

//Esto maneja el input
function handleInput(value) {
    console.log(`INPUT: "${value}" | num1="${num1}" num2="${num2}" op="${operator}" opPressed=${operatorPressed} justCalc=${justCalculated}`);

    //Checks if is not a nan value
    if (!isNaN(value) && value !== " ") {
        // Si no se ha pulsado el operador añade el valor del numero 1 y lo muestra
        // Cuando se pulse añade el del do y realiza la operacion
        if (!operatorPressed) {
            if (justCalculated) {
                num1 = "";
                justCalculated = false;
            }
            if(num1 === "0" && value === "0") return;
            if(value === "." && num1 === "") num1 = "0";
            if(value === "." && num1.includes(".")) return;
            num1 += value;
            result.value = num1;
        } else {
            if(num2 === "0" && value === "0") return;
            if (value === "." && num2 === "") num2 = "0";
            if (value === "." && num2.includes(".")) return;
            num2 += value;
            result.value = num2;
        }
        //Esto checkea que el operador sea el valor
    } else if (["+", "-", "*", "/"].includes(value)) {
        justCalculated = false;
        if (num1 !== "" && num2 !== "") {
            const res = calculate();
            num1 = String(res);
            result.value = num1;
            num2 = ""
        }
        operator = value;
        operatorPressed = true;

        //Checkea que el valor es = y si lo es muestra el resultado de las operacione
    } else if (value === "=") {
        if(!num1 || !num2 || !operator) return; // Guarda si faltan datos
        const res = calculate();
        result.value = res;
        num1 = String(res);
        num2 = "";
        operator= "";
        operatorPressed = false;
        justCalculated = true;
        //This clears the values
    } else if (value === "c") {
        result.value = "0";
        num1 = "";
        num2 = "";
        operator = "";
        operatorPressed = false;
        justCalculated = false;
        //this deletes the values
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

function calculate() {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (operator === "+") return add(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
}

//Esto activa la calculadora en modo click
container.addEventListener("click", (e) => {
    //Checkea si es el button indicado si no se retorna
    //Si lo es se llama a handleInput con el valor del target
    if (!e.target.matches("button")) return;
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



//Activa la calculadora con el teclado
document.addEventListener("keydown", (e) => {
    const key = e.key;
    const mappedValue = keyMap[key];

    if(mappedValue) {
        e.preventDefault();
        handleInput(mappedValue);
    }
})


//Operaciones
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return "Error: div/0";   // throw rompe sin try/catch en la UI
    return a / b;
}