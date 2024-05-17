import readlineSync from "readline-sync";
import chalk from "chalk";
import kNN from "../../globalClasses/src/kNN.js";
import DataSetDynamic from "../../globalClasses/src/DataSetDynamic.js";
import { MapOptions } from "../../globalClasses/src/types/index.js";

const log = console.log;

/**
 * Este dataset es para clasificación.
 */
const dataset = new DataSetDynamic({
  data: [
    [5.8, 2.8, 5.1, 2.4, "Iris-virginica"],
    [7.7, 3.0, 6.1, 2.3, "Iris-virginica"],
    [5.0, 3.4, 1.5, 0.2, "Iris-setosa"],
    [4.4, 3.0, 1.3, 0.2, "Iris-setosa"],
    [5.7, 3.8, 1.7, 0.3, "Iris-versicolor"],
    [5.8, 2.7, 3.9, 1.2, "Iris-versicolor"],
    [5.6, 3.0, 4.1, 1.3, "Iris-versicolor"],
    [5.8, 4.0, 1.2, 0.2, "Iris-setosa"],
    [6.1, 2.8, 4.0, 1.3, "Iris-versicolor"],
    [7.2, 3.6, 6.1, 2.5, "Iris-virginica"],
    // [6.4, 3.1, 5.5, 1.8, "Iris-virginica"],
    // [6.0, 2.2, 4.0, 1.0, "Iris-versicolor"],
    // [6.1, 3.0, 4.6, 1.4, "Iris-versicolor"],
    // [6.7, 3.1, 5.6, 2.4, "Iris-virginica"],
    // [5.2, 3.5, 1.5, 0.2, "Iris-setosa"],
  ],
  features: [
    "sepal_length",
    "sepal_width",
    "petal_length",
    "petal_width",
    "species",
  ],
  target: "species",
  normalize: false,
});

/**
 * Este dataset es para regresión.
 */
// const dataset = new DataSetDynamic({
//   data: [
//     [25, 40000, 135],
//     [35, 60000, 256],
//     [45, 80000, 231],
//     [20, 20000, 267],
//     [35, 120000, 139],
//     [52, 18000, 150],
//     [23, 95000, 127],
//     [40, 62000, 216],
//     [60, 100000, 139],
//     [48, 220000, 250],
//     [33, 150000, 264],
//   ],
//   features: [
//     "age",
//     "loan",
//     "HPI",
//   ],
//   target: "HPI",
//   normalize: false,
// }, 
// );

const knn = new kNN(dataset);

// [3.63, 3.02, 3.82, 3.42, 3.59, 2.87, 3.03, 3.46, 3.36, 3.3],
// [53.1, 49.7, 48.4, 54.2, 54.9, 43.7, 47.2, 45.2, 54.4, 50.4]
const getMenu = () => {
  return `
${chalk.white.bgBlue("-- kNN Options --")}
${chalk.bold("target")}: ${chalk.blue(knn.target)}
${chalk.bold("output")}: ${chalk.blue(knn.getOutputType())}
${chalk.bold("k")}: ${chalk.blue(knn.k)}
1.- Change to classification.
2.- Change to regression.
3.- Set k.
4.- Predict (input).
5.- Predict (automatic).
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
    knn.outputType("classification");
  },
  2() {
    knn.outputType("regression");
  },
  3() {
    const k = toNumber(readlineSync.question("k: "));
    if (k === null) {
      log(chalk.red("Invalid k"));
      return;
    }
    knn.setK(k);
  },
  4() {
    const input = readlineSync.question("Input: ");
    const row = input.split(",").map((value) => {
      return toNumber(value);
    });
    if (row.includes(null)) {
      log(chalk.red("Invalid input"));
      return;
    }
    log(chalk.yellow(`Prediction: ${knn.predict(row)}`));
    
  },
  5() {
    // [6.4, 3.1, 5.5, 1.8, "Iris-virginica"],
    // [6.0, 2.2, 4.0, 1.0, "Iris-versicolor"],
    // [6.1, 3.0, 4.6, 1.4, "Iris-versicolor"],
    // [6.7, 3.1, 5.6, 2.4, "Iris-virginica"],
    // [5.2, 3.5, 1.5, 0.2, "Iris-setosa"],
    let prediction = knn.predict([6.4, 3.1, 5.5, 1.8]);
    log(
      chalk.yellow(`
      Input: [6.4, 3.1, 5.5, 1.8].
      Prediction: ${prediction}`)
    );
    prediction = knn.predict([6.0, 2.2, 4.0, 1.0]);
    log(
      chalk.yellow(`
      Input: [6.0, 2.2, 4.0, 1.0].
      Prediction: ${prediction}`)
    );
    prediction = knn.predict([6.1, 3.0, 4.6, 1.4]);
    log(
      chalk.yellow(`
      Input: [6.1, 3.0, 4.6, 1.4].
      Prediction: ${prediction}`)
    );
    prediction = knn.predict([6.7, 3.1, 5.6, 2.4]);
    log(
      chalk.yellow(`
      Input: [6.7, 3.1, 5.6, 2.4].
      Prediction: ${prediction}`)
    );
    prediction = knn.predict([5.2, 3.5, 1.5, 0.2]);
    log(
      chalk.yellow(`
      Input: [5.2, 3.5, 1.5, 0.2].
      Prediction: ${prediction}`)
    );

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

function toNumber(value: string): number {
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}
