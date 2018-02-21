"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringBuilder_1 = require("./StringBuilder");
var Exceptions_1 = require("./Exceptions");
var ErrorHelper = /** @class */ (function () {
    function ErrorHelper() {
    }
    ErrorHelper.errorToLogMessage = function (error) {
        var sb = new StringBuilder_1.StringBuilder();
        sb.appendLine("Error '" + error.name + "': " + error.message);
        if (error.stack !== undefined) {
            sb.appendLine(error.stack);
        }
        if (Exceptions_1.Exception.isException(error) && error.innerException !== undefined) {
            sb.appendLine("The following errors were also encountered:");
            sb.appendLine(ErrorHelper.errorToLogMessage(error.innerException));
        }
        return sb.toString();
    };
    ErrorHelper.serialize = function (error) {
        return JSON.stringify(Object.assign({}, error));
    };
    return ErrorHelper;
}());
exports.ErrorHelper = ErrorHelper;
//# sourceMappingURL=ErrorHelper.js.map