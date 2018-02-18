"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exceptions_1 = require("./Exceptions");
var Strings = require("./String");
var URI_REGEX = /^(([^:]+:\\)|([^:/?#]+:)?(\/\/([^/?#]*)[\\/])?)(([^\\/]+[\\/])*)([^/?#]*)(\?[^#]*)?(#.*)?$/gi;
var Path = (function () {
    function Path() {
    }
    Path.getFileName = function (path) {
        return path.replace(URI_REGEX, "$8");
    };
    Path.getDirectory = function (path) {
        return path.replace(URI_REGEX, "$6");
    };
    Path.getExtension = function (path) {
        var fileName = Path.getFileName(path);
        if (fileName.indexOf('.') == -1) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf('.'));
    };
    Path.getFileNameWithoutExtension = function (path) {
        var fileName = Path.getFileName(path);
        if (fileName.indexOf('.') == -1) {
            return fileName;
        }
        return fileName.substring(0, fileName.lastIndexOf('.'));
    };
    /**
     * convert a string into a url friendly version
     * @param str
     * @param noTrim if true, it will leave hyphens (-) on the
     *               start and end of the url. You probably will
     *               never want this.
     */
    Path.toFriendlyUrl = function (str, noTrim) {
        if (noTrim === void 0) { noTrim = false; }
        var out = str.toLowerCase();
        out = out.replace(/&/g, " and ");
        out = out.replace(/@/g, " at ");
        out = out.replace(/[,'"]/g, "");
        out = out.replace(/[^a-z0-9]+/g, "-");
        out = out.replace(/^-+|-+$/g, "-");
        if (!noTrim) {
            out = out.replace(/^-+|-+$/g, '');
        }
        return out;
    };
    Path.combine = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length == 0) {
            throw new Exceptions_1.ArgumentException("path", "Provide at least 1 path to combine");
        }
        var segments = args.map(function (arg) { return Strings.trim(arg, '/\\'); });
        if (args[0].indexOf('\\') != -1) {
            return segments.join('\\');
        }
        return segments.join('/');
    };
    return Path;
}());
exports.Path = Path;
//# sourceMappingURL=Path.js.map