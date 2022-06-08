module.exports = class Operation {
    /**
     * @constructor
     * @param {number} x - jedna z dodawanych liczb
     * @param {number} y - druga z dodawanych liczb
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    /**
     * @function - dodawanie
     * @returns wynik dodawania
     */
    sum() {
        return this.x + this.y;
    };
}
