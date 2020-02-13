"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if the subject is undefined
 * @param subject
 */
function isUndefined(subject) {
    return subject === undefined;
}
exports.isUndefined = isUndefined;
/**
 * Returns true if the subject is null
 * @param subject
 */
function isNull(subject) {
    return subject === null;
}
exports.isNull = isNull;
/**
 * Returns true if the subject in undefined or null
 * @param subject
 */
function isUndefinedOrNull(subject) {
    return isUndefined(subject) || isNull(subject);
}
exports.isUndefinedOrNull = isUndefinedOrNull;
/**
 * Returns true if the subject is a number
 * @param subject
 */
function isNumber(subject) {
    return typeof subject === 'number';
}
exports.isNumber = isNumber;
/**
 * Returns true if the subject is a string
 * @param subject
 */
function isString(subject) {
    return typeof subject === 'string';
}
exports.isString = isString;
/**
 * Returns true if the subject is a boolean
 * @param subject
 */
function isBoolean(subject) {
    return typeof subject === 'boolean';
}
exports.isBoolean = isBoolean;
/**
 * Returns true if the subject is a date
 * @param subject
 */
function isDate(subject) {
    return subject instanceof Date;
}
exports.isDate = isDate;
function isFunction(subject) {
    return Object.prototype.toString.call(subject) === '[object Function]';
}
exports.isFunction = isFunction;
//# sourceMappingURL=TypeHelpers.js.map