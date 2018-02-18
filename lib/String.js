"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WHITESPACE = "\\s\\uFEFF\\xA0";
/**
 * An empty string.
 */
exports.empty = '';
/**
 * A new line.
 */
exports.newLine = "\n";
function format(format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    try {
        return format.replace(/{(\d+(:.*)?)}/g, function (match, i) {
            var s = match.split(':');
            if (s.length > 1) {
                i = i[0];
                match = s[1].replace('}', exports.empty);
            }
            var arg = convertToString(match, args[i]);
            return typeof arg != 'undefined' && arg != null ? arg : exports.empty;
        });
    }
    catch (e) {
        return exports.empty;
    }
}
exports.format = format;
function trim(str, chars) {
    if (chars === void 0) { chars = WHITESPACE; }
    var regex = new RegExp("^[" + chars + "]+|[" + chars + "]+$", 'g');
    return str.replace(regex, exports.empty);
}
exports.trim = trim;
function trimStart(str, chars) {
    if (chars === void 0) { chars = WHITESPACE; }
    var regex = new RegExp("^[" + chars + "]+", 'g');
    return str.replace(regex, exports.empty);
}
exports.trimStart = trimStart;
function trimEnd(str, chars) {
    if (chars === void 0) { chars = WHITESPACE; }
    var regex = new RegExp("[" + chars + "]+$", 'g');
    return str.replace(regex, exports.empty);
}
exports.trimEnd = trimEnd;
/**
 * Returns true if the string is undefined, null or empty
 * @param str
 */
function isNullOrEmpty(str) {
    return str === undefined || str === null || str.length == 0;
}
exports.isNullOrEmpty = isNullOrEmpty;
/**
 * Returns true if the string is undefined, null or whitespace
 * @param str
 */
function isNullOrWhitespace(str) {
    var regex = new RegExp("^[" + WHITESPACE + "]+$", 'g');
    return str === undefined || str === null || regex.test(str);
}
exports.isNullOrWhitespace = isNullOrWhitespace;
/**
 * Returns all characters in the string as an array.
 * @param str
 */
function toCharArray(str) {
    return str.split(exports.empty);
}
exports.toCharArray = toCharArray;
function convertToString(match, arg) {
    if (typeof arg === 'string') {
        return formatString(match, arg);
    }
    if (typeof arg === 'number') {
        return formatNumber(match, arg);
    }
    // default
    return formatString(match, exports.empty + arg);
}
function formatString(match, arg) {
    switch (match) {
        case 'L':
            arg = arg.toLowerCase();
            break;
        case 'U':
            arg = arg.toUpperCase();
            break;
        default:
            break;
    }
    return arg;
}
function formatNumber(match, arg) {
    switch (match.toLowerCase()) {
        case 'f0':
            arg = parseInt(arg.toString());
            break;
        default:
            break;
    }
    return arg.toString();
}
//# sourceMappingURL=String.js.map