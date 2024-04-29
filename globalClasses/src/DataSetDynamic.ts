import { DataObject, DataRow, DataSetConfig } from "./types/index.js";



export default class DataSetDynamic {
  data: DataRow[];
  features: string[];
  target: string;
  #dataParsed: DataObject[] = [];
  #minMax: { min: number, max: number }[] = [];
  #normalized: boolean = false;

  constructor({ data, features, target, normalize = false }: DataSetConfig) {
    this.data = data;
    this.features = features;
    this.target = target;

    // Normaliza los datos
    if (normalize) {
      this.#computeMinMax();
      this.#normalized = true;
      this.normalizeData();
    }

    // Parsea los datos a la forma { feature1: value1, feature2: value2, ..., target: targetValue }
    this.#dataParsed = this.data.map((row) => {
      return this.parseRow(row);
    });
  }

  get dataParsed() {
    return this.#dataParsed;
  }

  get normalized() {
    return this.#normalized;
  }

  parseRow(row: DataRow, hasTarget: boolean = true, type: "classification" | "regression" = "classification"): DataObject {
    // let type: "classification" | "regression";
    let obj: DataObject;

    if (hasTarget) {
      if (typeof row[row.length - 1] === 'string') {
        obj = {
          features: {},
          type: "classification",
          target: row[row.length - 1] as string,
        }
      } else {
        obj = {
          features: {},
          type: "regression",
          target: row[row.length - 1] as number,
        };
      }
    } else {
      obj = {
        features: {},
        type: type,
      };
    }

    this.features.forEach((feature, index) => {
      if (feature === this.target) return;
      const val = row[index] as number;
      obj.features[feature] = val;
    });

    // obj[this.target] = hasTarget ? row[row.length - 1] : "";
    return obj;
  }

  #computeMinMax() {
    this.#minMax = this.features.map((_, index) => {
      const column = this.data.map((row) => row[index] as number);
      return {
        min: Math.min(...column),
        max: Math.max(...column),
      };
    });
  }

  normalizeData() {
    this.data = this.data.map((row) => this.normalizeRow(row));
  }

  normalizeRow(row: DataRow, hasTarget: boolean = true) {
    return row.map((value, index) => {
      if (index === row.length - 1 && hasTarget) return value;
      return ((value as number) - this.#minMax[index].min) / (this.#minMax[index].max - this.#minMax[index].min);
    }) as DataRow;
  }
}