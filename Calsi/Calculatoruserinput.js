const readline = require("readline");
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculator() {
    r1.question("Enter Operation to perform addition subtraction multiplication division power square exit: ", (operator) => {
        console.log("You entered:", String(operator));
        operator = String(operator).toLowerCase();

        if (operator === "square") {
            r1.question("Enter the number to square", (n) => {
                n = Number(n);
                square(n);
                r1.close();
            });
        } else {

            r1.question("Enter first num ", (num1) => {

                r1.question("Enter second num ", (num2) => {

                    num1 = Number(num1);
                    num2 = Number(num2);


                    switch (operator) {
                        case "addition": add(num1, num2); break;
                        case "subtraction": sub(num1, num2); break;
                        case "multiplication": mul(num1, num2); break;
                        case "division": div(num1, num2); break;
                        case "power": pow(num1, num2); break;
                        case "exit": r1.close(); return;
                        default: console.log("invalid input");
                    }

                    calculator();

                    // r1.close();


                });
            });
        }

    });
}

// for (let i = 0; i < 5; i++) {
//     calculator();
// }
calculator();

function add(num1, num2) {
    let res = num1 + num2;
    console.log("Addition :" + res);
}

function sub(num1, num2) {
    let su = num1 - num2;
    console.log("Subtraction :" + su);
}

function mul(num1, num2) {
    let mu = num1 * num2;
    console.log("Multiplication:" + mu);
}

function div(num1, num2) {
    if (num1 === 0 || num2 === 0) {
        console.log("zero");
    } else {
        let di = num1 / num2;
        console.log("Division: " + di);
    }
}

function pow(num1, num2) {
    let po = Math.pow(num1, num2);
    console.log("Power: " + po);
}

function add(num1, num2) {
    let res = num1 + num2;
    console.log("Addition :" + res);
}

function square(n) {
    console.log(n * n);
}
