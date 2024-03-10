var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LinearRegression_instances, _LinearRegression_Ex, _LinearRegression_Ey, _LinearRegression_dataset, _LinearRegression_ExSquare, _LinearRegression_EySquare, _LinearRegression_Exy, _LinearRegression_beta_0_get, _LinearRegression_beta_1_get;
import DiscreteMaths from "./DiscreteMaths.js";
class LinearRegression {
    //   #beta_0;
    //   #beta_1;
    constructor(dataset) {
        _LinearRegression_instances.add(this);
        _LinearRegression_Ex.set(this, void 0);
        _LinearRegression_Ey.set(this, void 0);
        _LinearRegression_dataset.set(this, void 0);
        // #xSquare;
        // #ySquare;
        _LinearRegression_ExSquare.set(this, void 0);
        _LinearRegression_EySquare.set(this, void 0);
        // #xy;
        _LinearRegression_Exy.set(this, void 0);
        __classPrivateFieldSet(this, _LinearRegression_dataset, dataset, "f");
        __classPrivateFieldSet(this, _LinearRegression_Ex, DiscreteMaths.sumatory(dataset.x), "f");
        __classPrivateFieldSet(this, _LinearRegression_Ey, DiscreteMaths.sumatory(dataset.y), "f");
        __classPrivateFieldSet(this, _LinearRegression_ExSquare, DiscreteMaths.sumatory(DiscreteMaths.arraySquare(dataset.x)), "f");
        __classPrivateFieldSet(this, _LinearRegression_EySquare, DiscreteMaths.sumatory(DiscreteMaths.arraySquare(dataset.y)), "f");
        __classPrivateFieldSet(this, _LinearRegression_Exy, DiscreteMaths.sumatory(DiscreteMaths.multiplyArrays(dataset.x, dataset.y)), "f");
    }
    get x() {
        return __classPrivateFieldGet(this, _LinearRegression_dataset, "f").x;
    }
    get y() {
        return __classPrivateFieldGet(this, _LinearRegression_dataset, "f").y;
    }
    get tupleLength() {
        return __classPrivateFieldGet(this, _LinearRegression_dataset, "f").xLength;
    }
    get beta_0() {
        return __classPrivateFieldGet(this, _LinearRegression_instances, "a", _LinearRegression_beta_0_get);
    }
    get beta_1() {
        return __classPrivateFieldGet(this, _LinearRegression_instances, "a", _LinearRegression_beta_1_get);
    }
    //   toComputeBeta_1() {
    //     const numerator = this.tupleLength * this.#Exy - this.#Ex * this.#Ey;
    //     const denominator = this.tupleLength * this.#ExSquare - this.#Ex * this.#Ex;
    //     this.#beta_1 = numerator / denominator;
    // }
    // toComputeBeta_0() {
    //     if(!this.#beta_1) this.toComputeBeta_1()
    //     const numerator = this.#Ey - this.#beta_1 * this.#Ex;
    //     console.log(this.#Ey, this.#beta_1, this.#Ex);
    //     const denominator = this.tupleLength;
    //     console.log(numerator, denominator);
    //     this.#beta_0 = numerator / denominator;
    //   }
    printRegressionEq() {
        return `y = ${__classPrivateFieldGet(this, _LinearRegression_instances, "a", _LinearRegression_beta_0_get)} + ${__classPrivateFieldGet(this, _LinearRegression_instances, "a", _LinearRegression_beta_1_get)}x`;
    }
    predict(x) {
        return __classPrivateFieldGet(this, _LinearRegression_instances, "a", _LinearRegression_beta_0_get) + __classPrivateFieldGet(this, _LinearRegression_instances, "a", _LinearRegression_beta_1_get) * x;
    }
    correlationCoefficient() {
        const numerator = this.tupleLength * __classPrivateFieldGet(this, _LinearRegression_Exy, "f") - __classPrivateFieldGet(this, _LinearRegression_Ex, "f") * __classPrivateFieldGet(this, _LinearRegression_Ey, "f");
        const denominator = Math.sqrt((this.tupleLength * __classPrivateFieldGet(this, _LinearRegression_ExSquare, "f") - Math.pow(__classPrivateFieldGet(this, _LinearRegression_Ex, "f"), 2)) *
            (this.tupleLength * __classPrivateFieldGet(this, _LinearRegression_EySquare, "f") - Math.pow(__classPrivateFieldGet(this, _LinearRegression_Ey, "f"), 2)));
        return numerator / denominator;
    }
    determinationCoefficient() {
        return Math.pow(this.correlationCoefficient(), 2);
    }
    randomPredictions(quantity) {
        let numbers = [];
        const minNumber = Math.min(...__classPrivateFieldGet(this, _LinearRegression_dataset, "f").x);
        const maxNumber = Math.max(...__classPrivateFieldGet(this, _LinearRegression_dataset, "f").x);
        for (let i = 0; i < quantity; i++) {
            numbers.push(DiscreteMaths.randomNumber(minNumber, maxNumber));
        }
        const predictions = numbers.reduce((array, number) => {
            array.push({ number, prediction: this.predict(number) });
            return array;
        }, []);
        return predictions;
    }
}
_LinearRegression_Ex = new WeakMap(), _LinearRegression_Ey = new WeakMap(), _LinearRegression_dataset = new WeakMap(), _LinearRegression_ExSquare = new WeakMap(), _LinearRegression_EySquare = new WeakMap(), _LinearRegression_Exy = new WeakMap(), _LinearRegression_instances = new WeakSet(), _LinearRegression_beta_0_get = function _LinearRegression_beta_0_get() {
    const numerator = __classPrivateFieldGet(this, _LinearRegression_Ey, "f") - __classPrivateFieldGet(this, _LinearRegression_instances, "a", _LinearRegression_beta_1_get) * __classPrivateFieldGet(this, _LinearRegression_Ex, "f");
    const denominator = this.tupleLength;
    return numerator / denominator;
}, _LinearRegression_beta_1_get = function _LinearRegression_beta_1_get() {
    const numerator = this.tupleLength * __classPrivateFieldGet(this, _LinearRegression_Exy, "f") - __classPrivateFieldGet(this, _LinearRegression_Ex, "f") * __classPrivateFieldGet(this, _LinearRegression_Ey, "f");
    const denominator = this.tupleLength * __classPrivateFieldGet(this, _LinearRegression_ExSquare, "f") - __classPrivateFieldGet(this, _LinearRegression_Ex, "f") * __classPrivateFieldGet(this, _LinearRegression_Ex, "f");
    return numerator / denominator;
};
export default LinearRegression;
//# sourceMappingURL=LinearRegression.js.map