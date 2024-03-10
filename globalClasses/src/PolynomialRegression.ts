import DiscreteMaths from "./DiscreteMaths.js";
import DataSet from "./DataSet.js";
import Matrix from "./Matrix.js";

interface Prediction {
  number: number,
  prediction: number
}
type Approach = 'linear' | 'quadratic' | 'cubic'
export default class PolynomialRegression {
  #Ex: number;
  #Ey: number;
  #dataset: DataSet;
  // #xSquare;
  // #ySquare;
  #ExSquare: number;
  #EySquare: number;
  // #xy;
  #Exy: number;
  //   #beta_0;
  //   #beta_1;
  approach: Approach;

  constructor(dataset: DataSet, approach: Approach = "linear") {
    this.#dataset = dataset;
    this.approach = approach
    // this.#Ex = DiscreteMaths.sumatory(dataset.x);
    // this.#Ey = DiscreteMaths.sumatory(dataset.y);
    // this.#ExSquare = DiscreteMaths.sumatory(
    //   DiscreteMaths.arraySquare(dataset.x)
    // );
    // this.#EySquare = DiscreteMaths.sumatory(
    //   DiscreteMaths.arraySquare(dataset.y)
    // );
    // this.#Exy = DiscreteMaths.sumatory(
    //   DiscreteMaths.multiplyArrays(dataset.x, dataset.y)
    // );
  }

  printRegressionEq() {
    let matrix: Matrix;
    if(this.approach === 'linear') {
      matrix = new Matrix([this.#dataset.x], 'vertical', true)
      console.log("Inicia");
      console.log("MatrixNormal", matrix.toString(), matrix.numOfColumns, matrix.numOfRows);
      console.log("MatrixTranspuesta", matrix.transpose.toString(), matrix.transpose.numOfColumns, matrix.transpose.numOfRows);
      console.log("----------");
      console.log(DiscreteMaths.multiplyMatrix(matrix, matrix.transpose).toString());

    }

    return `y = ${this.#beta_0} + ${this.#beta_1}x`;
  }

  #computeBeta(matrix: Matrix) {
    
  }

  get x() {
    return this.#dataset.x;
  }
  get y() {
    return this.#dataset.y;
  }
  get tupleLength() {
    return this.#dataset.xLength;
  }

  get beta_0() {
    return this.#beta_0;
  }
  get beta_1() {
    return this.#beta_1;
  }
  get #beta_0() {
    const numerator = this.#Ey - this.#beta_1 * this.#Ex;
    const denominator = this.tupleLength;
    return numerator / denominator;
  }
  get #beta_1() {
    const numerator = this.tupleLength * this.#Exy - this.#Ex * this.#Ey;
    const denominator = this.tupleLength * this.#ExSquare - this.#Ex * this.#Ex;
    return numerator / denominator;
  }

  //   toComputeBeta_1() {
  //     const numerator = this.tupleLength * this.#Exy - this.#Ex * this.#Ey;
  //     const denominator = this.tupleLength * this.#ExSquare - this.#Ex * this.#Ex;
  //     this.#beta_1 = numerator / denominator;
  // }
  // toComputeBeta_0() {
  //     if(!this.#beta_1) this.toComputeBeta_1()
  //     const numerator = this.#Ey - this.#beta_1 * this.#Ex;
  //     console.log(this.#Ey, this.#beta_1, this.#Ex);
  //     const denominator = this.tupleLength;
  //     console.log(numerator, denominator);
  //     this.#beta_0 = numerator / denominator;
  //   }


  predict(x: number) {
    return this.#beta_0 + this.#beta_1 * x;
  }

  correlationCoefficient() {
    const numerator = this.tupleLength * this.#Exy - this.#Ex * this.#Ey;
    const denominator = Math.sqrt(
      (this.tupleLength * this.#ExSquare - Math.pow(this.#Ex, 2)) *
        (this.tupleLength * this.#EySquare - Math.pow(this.#Ey, 2))
    );
    return numerator / denominator;
  }
  determinationCoefficient() {
    return Math.pow(this.correlationCoefficient(), 2);
  }

  randomPredictions(quantity: number) {
    let numbers: Array<number> = [];
    const minNumber = Math.min(...this.#dataset.x);
    const maxNumber = Math.max(...this.#dataset.x);
    for (let i = 0; i < quantity; i++) {
      numbers.push(DiscreteMaths.randomNumber(minNumber, maxNumber));
    }
    const predictions = numbers.reduce((array: Array<Prediction>, number) => {
      array.push({ number, prediction: this.predict(number) });
      return array;
    }, []);

    return predictions;
  }
}
