type MatrixDirection = "horizontal" | "vertical";
export default class Matrix {
  #matrix: number[][];
  #direction: MatrixDirection;
  constructor(matrix: number[][], direction: MatrixDirection = "horizontal", fillWithConstans = false) {
    fillWithConstans && matrix.unshift(this.#getConstants(matrix[0].length));
    
    this.#matrix = matrix;
    this.#direction = direction;
    // console.log(matrix);
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
    if(this.#direction === 'horizontal') {
      return [...this.#matrix];
    } else {
      const numberOfRows = this.numOfRows;
      const rows: number[][] = new Array(numberOfRows);

      for (let i = 0; i < numberOfRows; i++) {
        rows[i] = [];
        this.#matrix.forEach((column) => {
          rows[i].push(column[i]);
        });
      }
      return rows;
    }
  }
  get columns() {
    if(this.#direction === "horizontal") {
      const numberOfColums = this.numOfColumns
      const colums: number[][] = new Array(numberOfColums);
      
      for (let i = 0; i < numberOfColums; i++) {
        colums[i] = []
        this.#matrix.forEach((row) => {
          colums[i].push(row[i]);
        });
      }
      return colums
    } else {
      return [...this.#matrix]
    }
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
      this.#direction === 'horizontal' ? this.columns : this.rows,
      this.#direction
    );
  }

  #getConstants = (length: number): number[] => new Array(length).fill(1);

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
