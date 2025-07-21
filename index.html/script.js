const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = '';
let operator = '';
let firstValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            operator = '';
            firstValue = '';
            display.value = '';
        } else if (value === 'del') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (value === '=') {
            if (firstValue && operator && currentInput) {
                let result = calculate(Number(firstValue), Number(currentInput), operator);
                display.value = result;
                currentInput = '';
                operator = '';
                firstValue = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                firstValue = currentInput;
                operator = value;
                currentInput = '';
            }
        } else {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            display.value = currentInput;
        }
    });
});

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}