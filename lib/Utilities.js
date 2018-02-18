"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Strings = require("./String");
var KEYVALUESEPARATOR = ":";
/**
 * returns true if the two objects are equal but not the same object. (compares public keys)
 * @param obj1
 * @param obj2
 * @param forceJSON converts the objects to JSON and compares the two strings.
 * @param deep Does a deep compare. forceJSON must be false
 */
function equals(obj1, obj2, forceJSON, deep) {
    if (forceJSON === void 0) { forceJSON = false; }
    if (deep === void 0) { deep = false; }
    var state = false;
    if (!forceJSON) {
        for (var key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                if (deep) {
                    state = equals(obj1[key], obj2[key], forceJSON, deep);
                }
                else {
                    state = obj1[key] == obj2[key];
                }
                if (!state) {
                    break;
                }
            }
        }
    }
    else {
        state = equivilentToByJSON(obj1, obj2);
    }
    return state;
}
exports.equals = equals;
/**
 * returns true if the two objects are equal but not the same object. (compares the JSON equilient of each object).. should be faster.. should..
 * @param obj1
 * @param obj2
 */
function equivilentToByJSON(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2);
}
exports.equivilentToByJSON = equivilentToByJSON;
/**
 * returns a hash of the object
 * @param o
 */
function getHash(o) {
    var hash = Strings.empty;
    if (!!JSON && !!JSON.stringify) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                hash += "" + key + KEYVALUESEPARATOR + o[key];
            }
        }
    }
    else {
        hash = JSON.stringify(o);
    }
    return hashString(hash).toString();
}
exports.getHash = getHash;
/**
 * Returns the type of the object as a string
 * @param o
 */
function getType(o) {
    // null
    if (o === null) {
        return 'null';
    }
    // jquery
    if (o.fn !== undefined && o.fn.jquery !== undefined) {
        return 'jQuery';
    }
    // value types
    if (typeof (o) != 'object') {
        return typeof (o);
    }
    // MicrosoftAjax
    if (o.constructor.getName && o.constructor.getName() != null) {
        return o.constructor.getName();
    }
    // constructor method name
    if (o.constructor.name === undefined) {
        var name = o.constructor.toString().match(/^[\n\r\s]*function\s*([^\s(]+)/)[1];
        if (!Strings.isNullOrEmpty(name)) {
            return name;
        }
    }
    else if (!Strings.isNullOrEmpty(o.constructor.name)) {
        return o.constructor.name;
    }
    // fallback
    return typeof o;
}
exports.getType = getType;
function hashString(str) {
    if (str.length === 0) {
        return 0;
    }
    else if (Array.prototype.reduce === undefined) {
        var hash = 0, i, chr;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    else {
        return str.split(Strings.empty)
            .map(function (chr) { return chr.charCodeAt(0); })
            .reduce(function (hash, chr) { return (((hash << 5) - hash) + chr) | 0; });
    }
}
;
//# sourceMappingURL=Utilities.js.map