type MatrixDirection = "horizontal" | "vertical";
export default class Matrix {
  #matrix: number[][];
  #direction: MatrixDirection;
  constructor(matrix: number[][], direction: MatrixDirection = "horizontal", fillWithConstans = false) {
    fillWithConstans && matrix.unshift(this.#getConstants(matrix[0].length));
    
    this.#matrix = matrix;
    this.#direction = direction;
    console.log(matrix);
  }

  get numOfRows() {
    return this.#direction === "horizontal"
      ? this.#matrix.length
      : this.#matrix[0].length;
  }
  get numOfColumns() {
    return this.#direction === "horizontal"
      ? this.#matrix[0].length
      : this.#matrix.length;
  }

  get rows() {
    return [...this.#matrix];
  }
  get columns() {
    const numberOfColums =
    this.#direction === "horizontal"
    ? this.#matrix[0].length
    : this.#matrix.length;
    const colums: number[][] = new Array(numberOfColums);
    
    for (let i = 0; i < numberOfColums; i++) {
      colums[i] = []
      this.#matrix.forEach((row) => {
        colums[i].push(row[i]);
      });
    }
    return colums
    /* for(let i = 0; i < this.#matrix.length; i++) {
      for()
      const colum = [
        this.#matrix[i]
      ]

      {
        0
      }
    } */
  }

  get transpose() {
    return new Matrix(
      this.#matrix,
      this.#direction === "horizontal" ? "vertical" : "horizontal"
    );
  }

  #getConstants = (length: number): number[] => new Array(length).fill(1);

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
