"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings_1 = require("./Strings");
const KEYVALUESEPARATOR = ":";
var Utilities;
(function (Utilities) {
    /**
     * returns true if the two objects are equal but not the same object. (compares public keys)
     * @param obj1
     * @param obj2
     * @param forceJSON converts the objects to JSON and compares the two strings.
     * @param deep Does a deep compare. forceJSON must be false
     */
    function equals(obj1, obj2, forceJSON = false, deep = false) {
        let state = false;
        if (!forceJSON) {
            for (let key in obj1) {
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
    Utilities.equals = equals;
    /**
     * returns true if the two objects are equal but not the same object. (compares the JSON equilient of each object).. should be faster.. should..
     * @param obj1
     * @param obj2
     */
    function equivilentToByJSON(obj1, obj2) {
        return JSON.stringify(obj1) == JSON.stringify(obj2);
    }
    Utilities.equivilentToByJSON = equivilentToByJSON;
    /**
     * returns a hash of the object
     * @param o
     */
    function getHash(o) {
        let hash = Strings_1.Strings.empty;
        if (!!JSON && !!JSON.stringify) {
            for (let key in o) {
                if (o.hasOwnProperty(key)) {
                    hash += `${key}${KEYVALUESEPARATOR}${o[key]}`;
                }
            }
        }
        else {
            hash = JSON.stringify(o);
        }
        return hashString(hash).toString();
    }
    Utilities.getHash = getHash;
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
            if (!Strings_1.Strings.isNullOrEmpty(name)) {
                return name;
            }
        }
        else if (!Strings_1.Strings.isNullOrEmpty(o.constructor.name)) {
            return o.constructor.name;
        }
        // fallback
        return typeof o;
    }
    Utilities.getType = getType;
})(Utilities = exports.Utilities || (exports.Utilities = {}));
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
        return str.split(Strings_1.Strings.empty)
            .map(chr => chr.charCodeAt(0))
            .reduce((hash, chr) => (((hash << 5) - hash) + chr) | 0);
    }
}
;
//# sourceMappingURL=Utilities.js.map