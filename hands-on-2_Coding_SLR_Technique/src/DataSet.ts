export default class DataSet {
  #x: number[];
  #y: number[];
  constructor({ x, y, sameLength = true }: { x: number[]; y: number[], sameLength?: boolean}) {
    if (sameLength) {
      const haveSameLength = x.length === y.length;
      if (!haveSameLength) return null;
    }
    this.#x = x;
    this.#y = y;
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
