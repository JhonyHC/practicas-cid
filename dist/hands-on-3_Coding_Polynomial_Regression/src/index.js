import readlineSync from "readline-sync";
import chalk from "chalk";
import PolynomialRegression from '../../globalClasses/src/PolynomialRegression.js';
import DataSet from '../../globalClasses/src/DataSet.js';
const log = console.log;
const dataset = new DataSet({
    x: [108, 115, 106, 97, 95, 91, 97, 83, 83, 78, 54, 67, 56, 51, 61, 115, 81, 78, 30, 45, 99, 32, 25, 28, 90, 89],
    y: [95, 96, 95, 97, 93, 94, 95, 93, 92, 89, 73, 80, 65, 69, 77, 96, 87, 89, 60, 63, 95, 61, 55, 56, 94, 93],
});
const polynomialR = new PolynomialRegression(dataset);
// [3.63, 3.02, 3.82, 3.42, 3.59, 2.87, 3.03, 3.46, 3.36, 3.3],
// [53.1, 49.7, 48.4, 54.2, 54.9, 43.7, 47.2, 45.2, 54.4, 50.4]
const getMenu = () => {
    return `
${chalk.white.bgBlue("-- Polynomial Regression Options --")}
${chalk.bold("x")}: ${chalk.blue(polynomialR.x)}
${chalk.bold("y")}: ${chalk.blue(polynomialR.y)}
1.- Print the Regression Equation.
2.- Predict Y.
3.- Print Coefficient of correlation & determination.
4.- Make 5 random predictions.
0.- exit.
`;
};
let exit = false;
const optionsMap = {
    0() {
        exit = true;
        console.log("Bye!");
    },
    1() {
        // const matrix1 = new Matrix([
        //   [5, -2, 8],
        //   [7, 1, 0],
        //   [-4, -7, -6],
        // ])
        // const matrix2 = new Matrix([
        //   [1, 0, 1],
        //   [1, 2, 1],
        //   [1, 1, 0],
        // ]);
        polynomialR.printRegressionEq();
        // log(chalk.yellow(polynomialR.printRegressionEq()));
    },
    2() {
        // let value = toNumber(readlineSync.question("Value of x: "));
        // if (value === null) {
        //   log(chalk.red("Wrong input, please enter a valid number"));
        //   return;
        // }
        let value = 70;
        const prediction = polynomialR.predict(value);
        log(chalk.yellow(`Value of x: ${value}`));
        log(chalk.yellow(`Value of y: ${prediction}`));
    },
    3() {
        log(chalk.yellow(`Correlation Coefficient: ${polynomialR.correlationCoefficient()}`));
        log(chalk.yellow(`Determination Coefficient: ${polynomialR.determinationCoefficient()}`));
    },
    4() {
        polynomialR.randomPredictions(5).forEach((prediction) => {
            log(chalk.yellow(`x: ${prediction.number}, y: ${prediction.prediction}`));
        });
    },
};
while (exit === false) {
    log(getMenu());
    const option = readlineSync.question("Option: ");
    if (!optionsMap[option]) {
        log(chalk.red("Invalid option"));
        continue;
    }
    optionsMap[option]();
}
function toNumber(value) {
    const number = Number(value);
    return Number.isNaN(number) ? null : number;
}
//# sourceMappingURL=index.js.map