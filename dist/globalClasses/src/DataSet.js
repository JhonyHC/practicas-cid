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
var _DataSet_x, _DataSet_y;
class DataSet {
    constructor({ x, y, sameLength = true, xLabel = 'x', yLabel = 'y' }) {
        _DataSet_x.set(this, void 0);
        _DataSet_y.set(this, void 0);
        if (sameLength) {
            const haveSameLength = x.length === y.length;
            if (!haveSameLength)
                return null;
        }
        __classPrivateFieldSet(this, _DataSet_x, x, "f");
        __classPrivateFieldSet(this, _DataSet_y, y, "f");
        this.xLabel = xLabel;
        this.yLabel = yLabel;
    }
    get x() {
        return __classPrivateFieldGet(this, _DataSet_x, "f");
    }
    get y() {
        return __classPrivateFieldGet(this, _DataSet_y, "f");
    }
    get xLength() {
        return __classPrivateFieldGet(this, _DataSet_x, "f").length;
    }
    get yLength() {
        return __classPrivateFieldGet(this, _DataSet_y, "f").length;
    }
    /**TODO */
    load() { }
}
_DataSet_x = new WeakMap(), _DataSet_y = new WeakMap();
export default DataSet;
;
//# sourceMappingURL=DataSet.js.map