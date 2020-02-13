"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeHelpers_1 = require("./TypeHelpers");
var Arrays;
(function (Arrays) {
    /**
     * Returns an array of the range of numbers from the start number for the specified length
     * @param start the start number
     * @param length the specified length
     */
    function range(start, length) {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(start++);
        }
        return arr;
    }
    Arrays.range = range;
    function sum(arr) {
        return arr.reduce((p, c) => p + c, 0);
    }
    Arrays.sum = sum;
    /**
     * Returns the average of all numbers in the array
     * @param arr the array
     */
    function average(arr) {
        if (arr.length > 0) {
            return sum(arr) / arr.length;
        }
        return 0;
    }
    Arrays.average = average;
    /**
     * Returns true if the sequence is equal
     * @param a array 1
     * @param b array 2
     * @param anyOrder set to true if you do not care about the order of the arrays
     */
    function sequenceEqual(a, b, anyOrder = false) {
        if (a === b) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        if (a.length != b.length) {
            return false;
        }
        if (anyOrder) {
            a = [...a].sort();
            b = [...b].sort();
        }
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    Arrays.sequenceEqual = sequenceEqual;
    /**
     * Returns true if the array is null, undefined or empty
     * @param a the array
     */
    function isNullOrEmpty(a) {
        return TypeHelpers_1.isUndefinedOrNull(a) || a.length == 0;
    }
    Arrays.isNullOrEmpty = isNullOrEmpty;
})(Arrays = exports.Arrays || (exports.Arrays = {}));
//# sourceMappingURL=Arrays.js.map