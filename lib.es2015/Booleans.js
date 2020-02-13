"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("./Exceptions");
const Result_1 = require("./Result");
var Booleans;
(function (Booleans) {
    Booleans.trueString = (true).toString();
    Booleans.falseString = (false).toString();
    function parse(value) {
        if (value.startsWith(Booleans.trueString)) {
            return true;
        }
        else if (value.startsWith(Booleans.falseString)) {
            return false;
        }
        else {
            throw new Exceptions_1.NotSupportedException("Value is not a boolean");
        }
    }
    Booleans.parse = parse;
    function tryParse(value) {
        try {
            return Result_1.Result.ok(parse(value));
        }
        catch (ex) {
            if (ex instanceof Exceptions_1.Exception) {
                return Result_1.Result.fail(ex.message);
            }
            else if (ex instanceof Error) {
                return Result_1.Result.fail(ex.message);
            }
            else {
                return Result_1.Result.fail(ex);
            }
        }
    }
    Booleans.tryParse = tryParse;
})(Booleans = exports.Booleans || (exports.Booleans = {}));
//# sourceMappingURL=Booleans.js.map