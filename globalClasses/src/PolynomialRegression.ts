import DiscreteMaths from "./DiscreteMaths.js";
import DataSet from "./DataSet.js";
import Matrix from "./Matrix.js";

interface Prediction {
  number: number,
  prediction: number
}
interface ParametersChache {
  [key: string]: number[]
}
type Approach = 'linear' | 'quadratic' | 'cubic'
export default class PolynomialRegression {
  #dataset: DataSet;
  #approach: Approach;
  #parametersCache: ParametersChache

  constructor(dataset: DataSet, approach: Approach = "linear") {
    this.#dataset = dataset;
    this.#parametersCache = {};
    this.approach = approach
  }

  set approach(value: Approach) {
    this.#approach = value
    this.#computeParametersByApproach();
  }
  get approach(){
    return this.#approach
  }

  printRegressionEq() {
    const parameters = this.getParameters();
    let eq = `${this.#dataset.yLabel} = ${parameters[0]}`
    for(let i = 1; i < parameters.length; i++) {
      eq += ` + ${parameters[i]} ${this.#dataset.xLabel}${i !== 1 ? `^${i}` : ''}`
    }
    return eq
  }

  #computeParametersByApproach() {
    let matrix: Matrix;
    if (this.approach === "linear") {
      matrix = new Matrix([this.#dataset.x], "vertical", true);
      return this.#computeParameters(matrix);
    } else if (this.approach === "quadratic") {
      matrix = new Matrix(
        [this.#dataset.x, DiscreteMaths.arrayPow(this.#dataset.x)],
        "vertical",
        true
      );
      return this.#computeParameters(matrix);
    } else if (this.approach === "cubic") {
      matrix = new Matrix(
        [
          this.#dataset.x,
          DiscreteMaths.arrayPow(this.#dataset.x),
          DiscreteMaths.arrayPow(this.#dataset.x, 3),
        ],
        "vertical",
        true
      );
      return this.#computeParameters(matrix);
    }
  }

  #computeParameters(matrix: Matrix) {
    if(this.#parametersCache[this.approach] !== undefined) return this.#parametersCache[this.approach];
    const xT_x = DiscreteMaths.multiplyMatrix(matrix.transpose, matrix);
    const xT_x_raisedMinus1 = new Matrix(xT_x.inverse);
    const xT_x_raisedMinus1_xT = DiscreteMaths.multiplyMatrix(
      xT_x_raisedMinus1,
      matrix.transpose
    );
    const finalMatrix = DiscreteMaths.multiplyMatrix(
      xT_x_raisedMinus1_xT,
      new Matrix([this.#dataset.y], "vertical")
    );
    this.#parametersCache[this.approach] = finalMatrix.rows.flat();
    return finalMatrix.rows.flat();
  }

  getParameters() {
      return this.#parametersCache[this.approach];
  }

  get x() {
    return this.#dataset.x;
  }
  get y() {
    return this.#dataset.y;
  }
  get xLabel() {
    return this.#dataset.xLabel;
  }
  get yLabel() {
    return this.#dataset.yLabel;
  }
  get tupleLength() {
    return this.#dataset.xLength;
  }

  predict(x: number) {
    const parameters = this.getParameters();
    
    let total = parameters[0];
    for (let i = 1; i < parameters.length; i++) {
      total += parameters[i] * Math.pow(x, i);
    }
    return total;
  }

  correlationCoefficient() {
    // return DiscreteMaths.correlationCoefficient(this.#dataset.x, this.#dataset.y)
    return Math.sqrt(
      DiscreteMaths.determinationCoefficient(
        this.#dataset.y,
        this.#predictDataset()
      )
    );
  }
  correlationCoefficientAll() {
    return DiscreteMaths.correlationCoefficient(this.#dataset.x, this.#dataset.y)
  }
  determinationCoefficient() {
    return DiscreteMaths.determinationCoefficient(this.#dataset.y, this.#predictDataset()) * 100
  }

  #predictDataset() {
    return this.#dataset.x.map(number => this.predict(number))
  }

  // randomPredictions(quantity: number) {
  //   let numbers: Array<number> = [];
  //   const minNumber = Math.min(...this.#dataset.x);
  //   const maxNumber = Math.max(...this.#dataset.x);
  //   for (let i = 0; i < quantity; i++) {
  //     numbers.push(DiscreteMaths.randomNumber(minNumber, maxNumber));
  //   }
  //   const predictions = numbers.reduce((array: Array<Prediction>, number) => {
  //     array.push({ number, prediction: this.predict(number) });
  //     return array;
  //   }, []);

  //   return predictions;
  // }
}
