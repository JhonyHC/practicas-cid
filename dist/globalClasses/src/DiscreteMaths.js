import Matrix from "./Matrix.js";
export default class DiscreteMaths {
    constructor() { }
    static sumatory(numbers) {
        return numbers.reduce((sum, number) => (sum += number), 0);
    }
    static arraySquare(numbers) {
        return numbers.map((number) => number * number);
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
        const res = m1.rows.map(row => {
            console.log("M1", row);
            const newMultiplyRow = [];
            m2.columns.forEach(column => {
                console.log("M2", column);
                newMultiplyRow.push(this.sumatory(this.multiplyArrays(row, column)));
            });
            return newMultiplyRow;
        });
        return new Matrix(res);
    }
}
//# sourceMappingURL=DiscreteMaths.js.map