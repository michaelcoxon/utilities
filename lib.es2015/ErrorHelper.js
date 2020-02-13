"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("./Exceptions");
var ErrorHelper;
(function (ErrorHelper) {
    function errorToLogMessage(error, sb) {
        sb.appendLine(`Error '${error.name}': ${error.message}`);
        if (error.stack !== undefined) {
            sb.indent();
            sb.appendLine(error.stack);
            sb.unindent();
        }
        if (Exceptions_1.Exception.isException(error) && error.innerException !== undefined) {
            sb.appendLine("The following errors were also encountered:");
            sb.indent();
            ErrorHelper.errorToLogMessage(error.innerException, sb);
            sb.unindent();
        }
    }
    ErrorHelper.errorToLogMessage = errorToLogMessage;
    function serialize(error) {
        return JSON.stringify(Object.assign({}, error));
    }
    ErrorHelper.serialize = serialize;
})(ErrorHelper = exports.ErrorHelper || (exports.ErrorHelper = {}));
//# sourceMappingURL=ErrorHelper.js.map