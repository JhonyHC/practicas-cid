import Matrix from "./Matrix.js";
export default class DiscreteMaths {
    constructor() { }
    static sumatory(numbers) {
        return numbers.reduce((sum, number) => (sum += number), 0);
    }
    static arrayPow(numbers, pow = 2) {
        return numbers.map((number) => Math.pow(number, pow));
    }
    static sumArrays(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return null;
        return arr1.map((item, index) => item - arr2[index]);
    }
    static subtractArrays(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return null;
        return arr1.map((item, index) => item - arr2[index]);
    }
    static multiplyArrays(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return null;
        return arr1.map((item, index) => item * arr2[index]);
    }
    static randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    static multiplyMatrix(m1, m2) {
        if (m1.numOfColumns !== m2.numOfRows)
            return null;
        const res = m1.rows.map((row) => {
            const newMultiplyRow = [];
            m2.columns.forEach((column) => {
                newMultiplyRow.push(this.sumatory(this.multiplyArrays(row, column)));
            });
            return newMultiplyRow;
        });
        return new Matrix(res);
    }
    static mean(arr) {
        return this.sumatory(arr) / arr.length;
    }
    /////
    static correlationCoefficient(x, y) {
        const xMean = this.mean(x);
        const xMeans = new Array(x.length).fill(xMean);
        const yMean = this.mean(y);
        const yMeans = new Array(y.length).fill(yMean);
        const numerator = this.sumatory(this.multiplyArrays(this.subtractArrays(x, xMeans), this.subtractArrays(y, yMeans)));
        const denominator = Math.sqrt(this.sumatory(this.arrayPow(this.subtractArrays(x, xMeans)))) *
            Math.sqrt(this.sumatory(this.arrayPow(this.subtractArrays(y, yMeans))));
        return numerator / denominator;
    }
    static determinationCoefficient(y, yPredictions) {
        const yMean = this.mean(y);
        const yMeans = new Array(y.length).fill(yMean);
        const numerator = this.sumatory(this.arrayPow(this.subtractArrays(y, yPredictions)));
        const denominator = this.sumatory(this.arrayPow(this.subtractArrays(y, yMeans)));
        return 1 - numerator / denominator;
    }
}
//# sourceMappingURL=DiscreteMaths.js.map