import readlineSync from "readline-sync";
import chalk from "chalk";
import LinearRegression from "../../globalClasses/src/LinearRegression.js";
import DataSet from "../../globalClasses/src/DataSet.js";
import {MapOptions} from '../../globalClasses/src/types/index.js'

const log = console.log;
const dataset = new DataSet({
  x: [1,2,3,4,5,6,7,8,9],
  y: [4,8,12,16,20,24,28,32,36],
});
const linearR = new LinearRegression(dataset);

// [3.63, 3.02, 3.82, 3.42, 3.59, 2.87, 3.03, 3.46, 3.36, 3.3],
// [53.1, 49.7, 48.4, 54.2, 54.9, 43.7, 47.2, 45.2, 54.4, 50.4]
const getMenu = () => {
  return `
${chalk.white.bgBlue("-- Linear Regression Options --")}
${chalk.bold("x")}: ${chalk.blue(linearR.x)}
${chalk.bold("y")}: ${chalk.blue(linearR.y)}
1.- Print the Regression Equation.
2.- Predict Y.
3.- Print Coefficient of correlation & determination.
4.- Make 5 random predictions.
0.- exit.
`;
};

let exit = false;
const optionsMap: MapOptions = {
  0() {
    exit = true;
    console.log("Bye!");
  },
  1() {
    log(chalk.yellow(linearR.printRegressionEq()));
  },
  2() {
    // let value = toNumber(readlineSync.question("Value of x: "));
    // if (value === null) {
    //   log(chalk.red("Wrong input, please enter a valid number"));
    //   return;
    // }
    let value = 70
    const prediction = linearR.predict(value);
    log(chalk.yellow(`Value of x: ${value}`));
    log(chalk.yellow(`Value of y: ${prediction}`));
  },
  3() {
    log(
      chalk.yellow(
        `Correlation Coefficient: ${linearR.correlationCoefficient()}`
      )
    );
    log(
      chalk.yellow(
        `Determination Coefficient: ${linearR.determinationCoefficient()}`
      )
    );
  },
  4() {
    linearR.randomPredictions(5).forEach((prediction) => {
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

function toNumber(value: number) {
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}
