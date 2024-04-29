import { DataObject, DataRow, DataSetConfig } from "./types/index.js";



export default class DataSetDynamic {
  data: DataRow[];
  features: string[];
  target: string;
  #dataParsed: DataObject[] = [];

  constructor(config: DataSetConfig) {
    this.data = config.data;
    this.features = config.features;
    this.target = config.target;


    // Parsea los datos a la forma { feature1: value1, feature2: value2, ..., target: targetValue }
    this.#dataParsed = this.data.map((row) => {
      return this.parseRow(row);
    });
  }

  get dataParsed() {
    return this.#dataParsed;
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
}