"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("./Exceptions");
const Strings_1 = require("./Strings");
var URI_REGEX = /^(([^:]+:\\)|([^:/?#]+:)?(\/\/([^/?#]*)[\\/])?)(([^\\/]+[\\/])*)([^/?#]*)(\?[^#]*)?(#.*)?$/gi;
var Path;
(function (Path) {
    function getFileName(path) {
        return path.replace(URI_REGEX, "$8");
    }
    Path.getFileName = getFileName;
    function getDirectory(path) {
        return path.replace(URI_REGEX, "$6");
    }
    Path.getDirectory = getDirectory;
    function getExtension(path) {
        let fileName = Path.getFileName(path);
        if (fileName.indexOf('.') == -1) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf('.'));
    }
    Path.getExtension = getExtension;
    function getFileNameWithoutExtension(path) {
        let fileName = Path.getFileName(path);
        if (fileName.indexOf('.') == -1) {
            return fileName;
        }
        return fileName.substring(0, fileName.lastIndexOf('.'));
    }
    Path.getFileNameWithoutExtension = getFileNameWithoutExtension;
    /**
     * convert a string into a url friendly version
     * @param str
     * @param noTrim if true, it will leave hyphens (-) on the
     *               start and end of the url. You probably will
     *               never want this.
     */
    function toFriendlyUrl(str, noTrim = false) {
        let out = str.toLowerCase();
        out = out.replace(/&/g, " and ");
        out = out.replace(/@/g, " at ");
        out = out.replace(/[,'"]/g, "");
        out = out.replace(/[^a-z0-9]+/g, "-");
        out = out.replace(/^-+|-+$/g, "-");
        if (!noTrim) {
            out = out.replace(/^-+|-+$/g, '');
        }
        return out;
    }
    Path.toFriendlyUrl = toFriendlyUrl;
    function combine(...args) {
        if (args.length == 0) {
            throw new Exceptions_1.ArgumentException("path", "Provide at least 1 path to combine");
        }
        let segments = args.map(arg => Strings_1.Strings.trim(arg, '/\\'));
        if (args[0].indexOf('\\') != -1) {
            return segments.join('\\');
        }
        return segments.join('/');
    }
    Path.combine = combine;
})(Path = exports.Path || (exports.Path = {}));
//# sourceMappingURL=Path.js.map