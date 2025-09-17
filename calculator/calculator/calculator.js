let cal=document.getElementById('display');
 
function append(value) {
    cal.value += value;
}
 
function clearDisplay() {
    cal.value = '';
}
 
function deleteLast() {
    cal.value = cal.value.slice(0, -1);
}
 
function calculate() {
    try {
        let expression = cal.value;
        let tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
 
        if (!tokens) {
            cal.value = 'Error';
            return;
        }
 
        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            let operator = tokens[i];
            let nextNumber = parseFloat(tokens[i + 1]);
 
            if (isNaN(nextNumber)) {
                cal.value = 'Error';
                return;
            }
 
            if (operator === '+') {
                result += nextNumber;
            } else if (operator === '-') {
                result -= nextNumber;
            } else if (operator === '*') {
                result *= nextNumber;
            } else if (operator === '/') {
                if (nextNumber === 0) {
                    cal.value = 'Error';
                    return;
                }
                result /= nextNumber;
            } else {
                cal.value = 'Error';
                return;
            }
        }
        cal.value = result;
    } catch (error) {
        cal.value = 'Error';
    }
}


