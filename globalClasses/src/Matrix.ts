import {inv} from 'mathjs'

type MatrixDirection = "horizontal" | "vertical";
export default class Matrix {
  #matrix: number[][];
  // #direction: MatrixDirection;
  constructor(matrix: number[][], direction: MatrixDirection = "horizontal", fillWithConstans = false) {
    fillWithConstans && matrix.unshift(this.#getConstants(matrix[0].length));
    
    this.#matrix = direction === "vertical" ? this.#transformMatrix(matrix) : matrix;
    // this.#direction = direction;
    // console.log(matrix);
  }

  get numOfRows() {
    return this.#matrix.length
  }
  get numOfColumns() {
    return this.#matrix[0].length
  }

  get rows() {
      return [...this.#matrix];
  }
  get columns() {
      const numberOfColums = this.numOfColumns
      const colums: number[][] = new Array(numberOfColums);
      
      for (let i = 0; i < numberOfColums; i++) {
        colums[i] = []
        this.#matrix.forEach((row) => {
          colums[i].push(row[i]);
        });
      }
      return colums
  }

  get transpose() {
    return new Matrix(
      this.columns
    );
  }

  get inverse() {
    return inv(this.#matrix)
  }

  #getConstants = (length: number): number[] => new Array(length).fill(1);

  #transformMatrix(matrix: number[][]) {
    const numberOfColumns = matrix[0].length;
    const rows: number[][] = new Array(numberOfColumns);

    for (let i = 0; i < numberOfColumns; i++) {
      rows[i] = [];
      matrix.forEach((row) => {
        rows[i].push(row[i]);
      });
    }
    return rows;
  }

  toString() {
    let string = `[\n`;
    this.#matrix.forEach(row=> {
      string += `[${row.toString()}]\n`
    })
    string += "]"
    return string
  }
  /**TODO */
  load() {}
}

/* 

Matrix(
  [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
                    ],
  "horizontal"
)

Matrix(
  [
    [1, [6,
    2,   7,
    3,   8,
    4,   9,
    5]  10] 
            ],
  "vertical"
)



*/
