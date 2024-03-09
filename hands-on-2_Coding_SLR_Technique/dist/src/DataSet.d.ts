export default class DataSet {
    #private;
    constructor({ x, y, sameLength }: {
        x: number[];
        y: number[];
        sameLength?: boolean;
    });
    get x(): number[];
    get y(): number[];
    get xLength(): number;
    get yLength(): number;
    /**TODO */
    load(): void;
}
