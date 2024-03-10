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
}
//# sourceMappingURL=DiscreteMaths.js.map