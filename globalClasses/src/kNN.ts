import DataSetDynamic from "./DataSetDynamic.js";
import { DataObject, DataRow, FeaturesInterface } from "./types/index.js";

interface ModeObject {
  [key: string]: number;
}

export default class kNN {
  dataset: DataSetDynamic;
  #k: number = 3;
  #outputType: 'regression' | 'classification';

  constructor(dataset: DataSetDynamic) {
    this.dataset = dataset;
    this.#outputType = this.dataset.dataParsed[0].type;
  }

  getOutputType() {
    return this.#outputType;
  }

  get target() {
    return this.dataset.target;
  }

  get k() {
    return this.#k;
  }

  outputType(type: 'regression' | 'classification') {
    this.#outputType = type;
    return this;
  }

  setK(k: number) {
    this.#k = k;
    return this;
  }

  predict(row: DataRow): number | string {
    // Parsea la fila a la forma { feature1: value1, feature2: value2, ..., target: targetValue }
    if (this.dataset.normalized) {
      row = this.dataset.normalizeRow(row, false);
    }
    const parsedRow: DataObject = this.dataset.parseRow(row, false);
    
    const distances = this.dataset.dataParsed.map((data) => {;
      return {
        targetValue: data.target,
        distance: this.euclideanDistance(Object.values(data.features), Object.values(parsedRow.features))
      }
    });

    distances.sort((a, b) => a.distance - b.distance);
    const kNearest = distances.slice(0, this.#k);

    if (this.#outputType === 'classification') {
      const values = kNearest.map((data) => data.targetValue as string); // Obtengo las clases
      const mode = values.reduce((acc: ModeObject, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(mode).reduce((a, b) => mode[a] > mode[b] ? a : b);
    } else {
      return kNearest.reduce((acc: number, data) => acc + (data.targetValue as number), 0) / this.#k;
    }
    
  }
  
  private euclideanDistance(row1: number[], row2: number[]): number {
    return Math.sqrt(
      row1.reduce((acc, feature, index) => {
        return acc + Math.pow(feature - row2[index], 2);
      }, 0)
    );
  }
  
  // getFeaturesValues(row : FeaturesInterface): number[] {
  //   const rowValues: number[] = [];
  //   this.dataset.features.forEach((feature) => {
  //     const value = row[feature];
  //     if (typeof value === 'number') {
  //       rowValues.push(value);
  //     }
  //   });
  //   return rowValues;
  // }
}