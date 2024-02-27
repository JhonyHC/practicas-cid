import { arraySquare, multiplyArrays, randomNumber, sumatory } from "./helper.js";


export default class LinearRegression {
    #x
    #y
    #Ex;
    #Ey;
    #xSquare;
    #ySquare;
    #ExSquare;
    #EySquare;
    #xy;
    #Exy;
    #tupleLength

    constructor (x, y) {
        if(x.length !== y.length) return null;

        this.#x = x
        this.#y = y
        this.#Ex = sumatory(x)
        this.#Ey = sumatory(y)
        this.#xSquare = arraySquare(x)
        this.#ySquare = arraySquare(y)
        this.#ExSquare = sumatory(this.#xSquare)
        this.#EySquare = sumatory(this.#ySquare)
        this.#xy = multiplyArrays(x, y)
        this.#Exy = sumatory(this.#xy)
        this.#tupleLength = x.length
    }

    get x() {
        return this.#x
    }
    get y() {
        return this.#y
    }
    get tupleLength() {
        return this.#tupleLength
    }

    printRegressionModel() {
        return `y = ${this.#b0} + ${this.#b1}x`
    }

    predict(x) {
        return this.#b0 + (this.#b1 * x)
    }

    correlationCoefficient() {
        const numerator = this.tupleLength * this.#Exy - this.#Ex * this.#Ey;
        const denominator = Math.sqrt((this.tupleLength * this.#ExSquare - Math.pow(this.#Ex, 2)) * ((this.tupleLength * this.#EySquare - Math.pow(this.#Ey, 2))));
        return numerator / denominator
    }
    determinationCoefficient() {
        return Math.pow(this.correlationCoefficient(), 2)
    }

    randomPredictions(quantity) {
        let numbers = []
        const minNumber = Math.min(...this.#x)
        const maxNumber = Math.max(...this.#x);
        for(let i=0; i < quantity; i++) {
            numbers.push(randomNumber(minNumber, maxNumber));
        }
        const predictions = numbers.reduce((array, number) => {
            array.push({ number, prediction: this.predict(number) });
            return array;
        }, [])
        
        return predictions
    }

    get #b1() {
        const numerator = this.tupleLength * this.#Exy - this.#Ex * this.#Ey
        const denominator = this.tupleLength * this.#ExSquare - this.#Ex * this.#Ex
        return numerator / denominator
    }

    get #b0() {
        const numerator = (this.#Ey) - (this.#b1 * this.#Ex)
        const denominator = this.tupleLength
        return numerator / denominator
    }

}