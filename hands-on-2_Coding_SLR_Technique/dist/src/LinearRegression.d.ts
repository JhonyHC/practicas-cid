import DataSet from "./DataSet.js";
interface Prediction {
    number: number;
    prediction: number;
}
export default class LinearRegression {
    #private;
    constructor(dataset: DataSet);
    get x(): number[];
    get y(): number[];
    get tupleLength(): number;
    get beta_0(): number;
    get beta_1(): number;
    printRegressionEq(): string;
    predict(x: number): number;
    correlationCoefficient(): number;
    determinationCoefficient(): number;
    randomPredictions(quantity: number): Prediction[];
}
export {};
