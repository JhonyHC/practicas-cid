type DataSetType = { 
  x: number[]
  y: number[] 
  sameLength?: boolean
  xLabel?: string
  yLabel?: string
};
export default class DataSet {
  #x: number[];
  #y: number[];
  xLabel: string;
  yLabel: string;
  constructor({ x, y, sameLength = true, xLabel = 'x', yLabel = 'y' }: DataSetType ) {
    if (sameLength) {
      const haveSameLength = x.length === y.length;
      if (!haveSameLength) return null;
    }
    this.#x = x;
    this.#y = y;
    this.xLabel = xLabel
    this.yLabel = yLabel
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }

  get xLength() {
    return this.#x.length;
  }
  get yLength() {
    return this.#y.length;
  }

  /**TODO */
  load() {}
};
