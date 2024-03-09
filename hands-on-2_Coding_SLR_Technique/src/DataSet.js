export default class DataSet {
  #x;
  #y;
  constructor({ x, y, sameLength = true }) {
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
