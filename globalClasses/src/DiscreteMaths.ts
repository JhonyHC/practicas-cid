import Matrix from "./Matrix.js";

export default class DiscreteMaths {
  constructor() {}

  static sumatory(numbers: number[]): number {
    return numbers.reduce((sum, number) => (sum += number), 0);
  }

  static arraySquare(numbers: number[]): number[] {
    return numbers.map((number) => number * number);
  }

  static multiplyArrays(arr1: number[], arr2: number[]): number[] {
    if (arr1.length !== arr2.length) return null;
    return arr1.map((item, index) => item * arr2[index]);
  }

  static randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  static multiplyMatrix(m1: Matrix, m2: Matrix): Matrix | null {
    if(m1.numOfColumns !== m2.numOfRows) return null
    const res = m1.rows.map(row => {
      const newMultiplyRow: number[] = []
      m2.columns.forEach(column => {
        newMultiplyRow.push(this.sumatory(this.multiplyArrays(row, column)))
      })
      return newMultiplyRow
    })
    return new Matrix(res)
  }
}
