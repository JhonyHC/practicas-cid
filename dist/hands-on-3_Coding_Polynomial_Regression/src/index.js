import readlineSync from "readline-sync";
import chalk from "chalk";
import PolynomialRegression from "../../globalClasses/src/PolynomialRegression.js";
import DataSet from "../../globalClasses/src/DataSet.js";
const log = console.log;
const dataset = new DataSet({
    x: [
        108, 115, 106, 97, 95, 91, 97, 83, 83, 78, 54, 67, 56, 53, 61, 115, 81, 78,
        30, 45, 99, 32, 25, 28, 90, 89,
    ],
    y: [
        95, 96, 95, 97, 93, 94, 95, 93, 92, 86, 73, 80, 65, 69, 77, 96, 87, 89, 60,
        63, 95, 61, 55, 56, 94, 93,
    ],
    xLabel: "Batch Size",
    yLabel: "Machine Efficiency %",
});
const polynomialR = new PolynomialRegression(dataset);
// [3.63, 3.02, 3.82, 3.42, 3.59, 2.87, 3.03, 3.46, 3.36, 3.3],
// [53.1, 49.7, 48.4, 54.2, 54.9, 43.7, 47.2, 45.2, 54.4, 50.4]
const getMenu = () => {
    return `
${chalk.white.bgBlue("-- Polynomial Regression Options --")}
${chalk.bold("x")}: ${chalk.blue(polynomialR.x)}
${chalk.bold("y")}: ${chalk.blue(polynomialR.y)}
1.- Print the Linear Regression Equation.
2.- Print the Quadratic Regression Equation.
3.- Print the Cubic Regression Equation.
4.- Predict Y.
5.- Print Coefficient of correlation & determination.
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
        //   [2, -3],
        //   [0, 4],
        //   [7, -5],
        // ])
        // console.log(DiscreteMaths.multiplyMatrix(matrix1, matrix1.transpose).toString());
        // const matrix2 = new Matrix([
        //   [1, 0, 1],
        //   [1, 2, 1],
        //   [1, 1, 0],
        // ]);
        // polynomialR.printRegressionEq();
        polynomialR.approach = "linear";
        log(chalk.yellow(polynomialR.printRegressionEq()));
    },
    2() {
        polynomialR.approach = "quadratic";
        log(chalk.yellow(polynomialR.printRegressionEq()));
        // let value = toNumber(readlineSync.question("Value of x: "));
        // if (value === null) {
        //   log(chalk.red("Wrong input, please enter a valid number"));
        //   return;
        // }
        // let value = 70
        // const prediction = polynomialR.predict(value);
        // log(chalk.yellow(`Value of x: ${value}`));
        // log(chalk.yellow(`Value of y: ${prediction}`));
    },
    3() {
        polynomialR.approach = "cubic";
        log(chalk.yellow(polynomialR.printRegressionEq()));
        // let value = toNumber(readlineSync.question("Value of x: "));
        // if (value === null) {
        //   log(chalk.red("Wrong input, please enter a valid number"));
        //   return;
        // }
        // let value = 70
        // const prediction = polynomialR.predict(value);
        // log(chalk.yellow(`Value of x: ${value}`));
        // log(chalk.yellow(`Value of y: ${prediction}`));
    },
    4() {
        polynomialR.approach = "linear";
        let value = 70;
        let prediction = polynomialR.predict(value);
        log(chalk.yellow(`Value of ${polynomialR.xLabel}: ${value}`));
        log(chalk.yellow(`Value of ${polynomialR.yLabel}: ${prediction}`));
        polynomialR.approach = "quadratic";
        prediction = polynomialR.predict(value);
        log(chalk.yellow(`Value of ${polynomialR.xLabel}: ${value}`));
        log(chalk.yellow(`Value of ${polynomialR.yLabel}: ${prediction}`));
        polynomialR.approach = "cubic";
        prediction = polynomialR.predict(value);
        log(chalk.yellow(`Value of ${polynomialR.xLabel}: ${value}`));
        log(chalk.yellow(`Value of ${polynomialR.yLabel}: ${prediction}`));
        polynomialR.approach = "linear";
        prediction = polynomialR.predict(32);
        log(chalk.yellow(`Value of ${polynomialR.xLabel}: ${32}`));
        log(chalk.yellow(`Value of ${polynomialR.yLabel}: ${prediction}`));
        polynomialR.approach = "quadratic";
        prediction = polynomialR.predict(56);
        log(chalk.yellow(`Value of ${polynomialR.xLabel}: ${56}`));
        log(chalk.yellow(`Value of ${polynomialR.yLabel}: ${prediction}`));
        polynomialR.approach = "cubic";
        prediction = polynomialR.predict(115);
        log(chalk.yellow(`Value of ${polynomialR.xLabel}: ${115}`));
        log(chalk.yellow(`Value of ${polynomialR.yLabel}: ${prediction}`));
    },
    5() {
        polynomialR.approach = "linear";
        log(chalk.yellow(`Correlation Coefficient: ${polynomialR.correlationCoefficient()}`));
        log(chalk.yellow(`Determination Coefficient (linear): ${polynomialR.determinationCoefficient()}`));
        polynomialR.approach = "quadratic";
        log(chalk.yellow(`Correlation Coefficient: ${polynomialR.correlationCoefficient()}`));
        log(chalk.yellow(`Determination Coefficient (quadratic): ${polynomialR.determinationCoefficient()}`));
        polynomialR.approach = "cubic";
        log(chalk.yellow(`Correlation Coefficient: ${polynomialR.correlationCoefficient()}`));
        log(chalk.yellow(`Determination Coefficient (cubic): ${polynomialR.determinationCoefficient()}`));
    },
    6() {
        // polynomialR.randomPredictions(5).forEach((prediction) => {
        //   log(chalk.yellow(`x: ${prediction.number}, y: ${prediction.prediction}`));
        // });
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