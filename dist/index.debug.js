/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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
    if (chars !== undefined) {
        chars = escapeRegExp(chars);
    }
    else {
        chars = WHITESPACE;
    }
    var regex = new RegExp("^[" + chars + "]+|[" + chars + "]+$", 'g');
    return str.replace(regex, exports.empty);
}
exports.trim = trim;
function trimStart(str, chars) {
    if (chars !== undefined) {
        chars = escapeRegExp(chars);
    }
    else {
        chars = WHITESPACE;
    }
    var regex = new RegExp("^[" + chars + "]+", 'g');
    return str.replace(regex, exports.empty);
}
exports.trimStart = trimStart;
function trimEnd(str, chars) {
    if (chars !== undefined) {
        chars = escapeRegExp(chars);
    }
    else {
        chars = WHITESPACE;
    }
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
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
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
//# sourceMappingURL=Strings.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Strings = __webpack_require__(0);
/**
 * Represents errors that occur during application execution.
 */
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    function Exception(message, innerException) {
        var _newTarget = this.constructor;
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, message) || this;
        // Alternatively use Object.setPrototypeOf if you have an ES6 environment.
        _this.__proto__ = trueProto;
        _this._innerException = innerException;
        return _this;
    }
    Object.defineProperty(Exception.prototype, "innerException", {
        /** Gets the Exception instance that caused the current exception. */
        get: function () {
            return this._innerException;
        },
        enumerable: true,
        configurable: true
    });
    Exception.isException = function (error) {
        return error['innerException'] !== undefined;
    };
    return Exception;
}(Error));
exports.Exception = Exception;
/**
 * The exception that is thrown when one of the arguments provided to a method is not valid.
 */
var ArgumentException = /** @class */ (function (_super) {
    __extends(ArgumentException, _super);
    function ArgumentException(argumentName, message, innerException) {
        var _this = this;
        var _message = "'" + argumentName + "' " + message;
        if (innerException) {
            _this = _super.call(this, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, _message) || this;
        }
        _this.name = 'ArgumentException';
        return _this;
    }
    return ArgumentException;
}(Exception));
exports.ArgumentException = ArgumentException;
var ArgumentUndefinedException = /** @class */ (function (_super) {
    __extends(ArgumentUndefinedException, _super);
    function ArgumentUndefinedException(argumentName, innerException) {
        var _this = this;
        var _message = argumentName + ' is undefined';
        if (innerException) {
            _this = _super.call(this, argumentName, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, argumentName, _message) || this;
        }
        _this.name = 'ArgumentUndefinedException';
        return _this;
    }
    return ArgumentUndefinedException;
}(ArgumentException));
exports.ArgumentUndefinedException = ArgumentUndefinedException;
var ArgumentNullException = /** @class */ (function (_super) {
    __extends(ArgumentNullException, _super);
    function ArgumentNullException(argumentName, innerException) {
        var _this = this;
        var _message = argumentName + ' is null';
        if (innerException) {
            _this = _super.call(this, argumentName, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, argumentName, _message) || this;
        }
        _this.name = 'ArgumentNullException';
        return _this;
    }
    return ArgumentNullException;
}(ArgumentException));
exports.ArgumentNullException = ArgumentNullException;
var InvalidTypeException = /** @class */ (function (_super) {
    __extends(InvalidTypeException, _super);
    function InvalidTypeException(variableName, expectedTypeName, message, innerException) {
        var _this = this;
        var _message = "Type of '" + variableName + "' is not supported. Expected: '" + expectedTypeName + "'" + (message !== undefined ? message : Strings.empty);
        if (innerException) {
            _this = _super.call(this, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, _message) || this;
        }
        _this.name = 'InvalidTypeException';
        return _this;
    }
    return InvalidTypeException;
}(Exception));
exports.InvalidTypeException = InvalidTypeException;
var NotImplementedException = /** @class */ (function (_super) {
    __extends(NotImplementedException, _super);
    function NotImplementedException(message, innerException) {
        var _this = this;
        if (innerException) {
            _this = _super.call(this, message, innerException) || this;
        }
        else {
            if (message) {
                _this = _super.call(this, message) || this;
            }
            else {
                _this = _super.call(this) || this;
            }
        }
        _this.name = 'NotImplementedException';
        return _this;
    }
    return NotImplementedException;
}(Exception));
exports.NotImplementedException = NotImplementedException;
var NotSupportedException = /** @class */ (function (_super) {
    __extends(NotSupportedException, _super);
    function NotSupportedException(message, innerException) {
        var _this = this;
        if (innerException) {
            _this = _super.call(this, message, innerException) || this;
        }
        else {
            if (message) {
                _this = _super.call(this, message) || this;
            }
            else {
                _this = _super.call(this) || this;
            }
        }
        _this.name = 'NotSupportedException';
        return _this;
    }
    return NotSupportedException;
}(Exception));
exports.NotSupportedException = NotSupportedException;
var OutOfBoundsException = /** @class */ (function (_super) {
    __extends(OutOfBoundsException, _super);
    function OutOfBoundsException(variableName, minBound, maxBound, innerException) {
        var _this = this;
        var _message = "The value of '" + variableName + "' is out of bounds. min: '" + minBound + "', max: '" + maxBound + "'";
        if (innerException) {
            _this = _super.call(this, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, _message) || this;
        }
        _this.name = 'OutOfBoundsException';
        return _this;
    }
    return OutOfBoundsException;
}(Exception));
exports.OutOfBoundsException = OutOfBoundsException;
var IndexOutOfRangeException = /** @class */ (function (_super) {
    __extends(IndexOutOfRangeException, _super);
    function IndexOutOfRangeException(variableName, index, minBound, maxBound, innerException) {
        var _this = this;
        var _message = "The index of '" + index + "' on '" + variableName + "' is out of bounds. min: '" + minBound + "', max: '" + maxBound + "'";
        if (innerException) {
            _this = _super.call(this, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, _message) || this;
        }
        _this.name = 'OutOfBoundsException';
        return _this;
    }
    return IndexOutOfRangeException;
}(Exception));
exports.IndexOutOfRangeException = IndexOutOfRangeException;
var FileNotFoundException = /** @class */ (function (_super) {
    __extends(FileNotFoundException, _super);
    function FileNotFoundException(filename, innerException) {
        var _this = this;
        var _message = "File '" + filename + "' is not found";
        if (innerException) {
            _this = _super.call(this, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, _message) || this;
        }
        _this.name = 'FileNotFoundException';
        return _this;
    }
    return FileNotFoundException;
}(Exception));
exports.FileNotFoundException = FileNotFoundException;
var KeyNotFoundException = /** @class */ (function (_super) {
    __extends(KeyNotFoundException, _super);
    function KeyNotFoundException(key, innerException) {
        var _this = this;
        var _message = "Key '" + key + "' is not found";
        if (innerException) {
            _this = _super.call(this, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, _message) || this;
        }
        _this.name = 'KeyNotFoundException';
        return _this;
    }
    return KeyNotFoundException;
}(Exception));
exports.KeyNotFoundException = KeyNotFoundException;
var KeyAlreadyDefinedException = /** @class */ (function (_super) {
    __extends(KeyAlreadyDefinedException, _super);
    function KeyAlreadyDefinedException(key, innerException) {
        var _this = this;
        var _message = "Key '" + key + "' is already defined";
        if (innerException) {
            _this = _super.call(this, _message, innerException) || this;
        }
        else {
            _this = _super.call(this, _message) || this;
        }
        _this.name = 'KeyAlreadyDefinedException';
        return _this;
    }
    return KeyAlreadyDefinedException;
}(Exception));
exports.KeyAlreadyDefinedException = KeyAlreadyDefinedException;
//# sourceMappingURL=Exceptions.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringBuilder_1 = __webpack_require__(6);
var Exceptions_1 = __webpack_require__(1);
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Exceptions_1 = __webpack_require__(1);
/**
 * Class to represent an event.
 */
var Event = /** @class */ (function () {
    /**
     * Creates a new event
     */
    function Event() {
        this._eventHandlers = [];
    }
    /**
     * Invokes the event
     * @param sender the object that is calling invoke
     * @param args the arguments to send along with the event.
     */
    Event.prototype.invoke = function (sender, args) {
        for (var _i = 0, _a = this._eventHandlers; _i < _a.length; _i++) {
            var eventHandler = _a[_i];
            eventHandler.call(sender, sender, args);
        }
    };
    /**
     * Adds a handler to the event
     * @param eventHandler
     */
    Event.prototype.addHandler = function (eventHandler) {
        this._eventHandlers.push(eventHandler);
        return eventHandler;
    };
    /**
     * removes a handler from the event.
     * @param eventHandler
     */
    Event.prototype.removeHandler = function (eventHandler) {
        var index = this._eventHandlers.indexOf(eventHandler);
        if (index != -1) {
            this._eventHandlers.splice(index, 1);
        }
        else {
            throw new Exceptions_1.ArgumentException('eventHandler', "Handler is not in this Event");
        }
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** The log level. Used for filtering and tagging logging events */
var LogLevel;
(function (LogLevel) {
    /** Debug. Should only be used for logging to help development */
    LogLevel["Debug"] = "DEBG";
    /** Error. Used to log out errors and exceptions */
    LogLevel["Error"] = "EROR";
    /** Informational. Used to provide runtime information */
    LogLevel["Info"] = "INFO";
    /** Trace. Used to log program flow */
    LogLevel["Trace"] = "TRCE";
    /** Warning. Used to log errors and exceptions that do not break the program but need to be klnown about */
    LogLevel["Warn"] = "WARN";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * Returns true if the desired log level is valid for the currently configured logging verbosity
 * @param desiredLevel The log level you want to log at
 * @param loggingVerbosity The cut off for when logging should be hidden
 */
function testLogVerbosity(desiredLevel, loggingVerbosity) {
    var isError = desiredLevel === LogLevel.Error;
    var isWarn = desiredLevel === LogLevel.Warn;
    var isInfo = desiredLevel === LogLevel.Info;
    var isTrace = desiredLevel === LogLevel.Trace;
    var isDebug = desiredLevel === LogLevel.Debug;
    return loggingVerbosity === LogLevel.Error && isError
        || loggingVerbosity === LogLevel.Warn && (isError || isWarn)
        || loggingVerbosity === LogLevel.Info && (isError || isWarn || isInfo)
        || loggingVerbosity === LogLevel.Trace && (isError || isWarn || isInfo || isTrace)
        || loggingVerbosity === LogLevel.Debug && (isError || isWarn || isInfo || isTrace || isDebug);
}
exports.testLogVerbosity = testLogVerbosity;
/**
 * Decorator for setting the logger scope of an ILogger instance
 * @param name
 */
function loggerScope(name) {
    return function (target, key) {
        var logger = target[key];
        if (!logger) {
            throw "logger is no set yet";
        }
        target[key] = logger.scope(name);
    };
}
exports.loggerScope = loggerScope;
//# sourceMappingURL=ILogger.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScopedLogger = /** @class */ (function () {
    function ScopedLogger(logger, name) {
        this._disposed = false;
        this._logger = logger;
        this._name = name;
    }
    ScopedLogger.prototype.debug = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.debug(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.debugError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.debugError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.error = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.error(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.errorError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.errorError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.info = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.info(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.infoError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.infoError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.trace = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.trace(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.traceError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.traceError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.warn = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.warn(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.warnError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.warnError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.scope = function (name) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        return new ScopedLogger(this, name);
    };
    ScopedLogger.prototype.prepareMessage = function (msg) {
        return "[" + this._name + "]" + (msg !== undefined ? ' ' : '') + (msg || null);
    };
    ScopedLogger.prototype.dispose = function () {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._disposed = true;
    };
    return ScopedLogger;
}());
exports.ScopedLogger = ScopedLogger;
//# sourceMappingURL=ScopedLogger.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Strings = __webpack_require__(0);
/**
 * Class for building strings that will only concatenate them upon calling toString().
 */
var StringBuilder = /** @class */ (function () {
    /**
     * Create a new StringBuilder.
     * @param value
     */
    function StringBuilder() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        if (value !== undefined) {
            this._strings = value.slice();
        }
        else {
            this._strings = [];
        }
        this._invalidateLastValue = true;
    }
    /**
     * Append the value to the builder
     * @param value
     */
    StringBuilder.prototype.append = function (value) {
        this._strings.push(value);
        this._invalidateLastValue = true;
    };
    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    StringBuilder.prototype.appendLine = function (value) {
        (_a = this._strings).push.apply(_a, [value, Strings.newLine]);
        this._invalidateLastValue = true;
        var _a;
    };
    /**
     * Clears all values from the StringBuilder.
     */
    StringBuilder.prototype.clear = function () {
        this._strings.length = 0;
        this._invalidateLastValue = true;
    };
    /**
     * Returns a string representation of the StringBuilder.
     */
    StringBuilder.prototype.toString = function () {
        if (this._invalidateLastValue) {
            this._invalidateLastValue = false;
            return this._lastValue = this._strings.join(Strings.empty);
        }
        else {
            return this._lastValue || Strings.empty;
        }
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;
//# sourceMappingURL=StringBuilder.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The AsyncWrapper is provided to monitor the state of a promise.
 * You can use this to provide state feedback to the user of an awaitable
 * method.
 */
var AsyncWrapper = /** @class */ (function () {
    function AsyncWrapper(promiseOrValue, callback) {
        var _this = this;
        this._complete = false;
        this._success = false;
        this._promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(promiseOrValue !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.doWork(resolve, reject, promiseOrValue, callback)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    }
    Object.defineProperty(AsyncWrapper.prototype, "promise", {
        /** Return the internal promise that is waiting for the orginal one to complete */
        get: function () {
            return this._promise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWrapper.prototype, "complete", {
        /** returns true when the promise is complete, even if it errored */
        get: function () {
            return this._complete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWrapper.prototype, "success", {
        /** returns true if the promise completed successfully */
        get: function () {
            return this._success;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWrapper.prototype, "value", {
        /** returns the value of the promise */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWrapper.prototype, "error", {
        /** returns the error if the promise failed */
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    AsyncWrapper.prototype.doWork = function (resolve, reject, promiseOrValue, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        _a = this;
                        return [4 /*yield*/, promiseOrValue];
                    case 1:
                        _a._value = _b.sent();
                        resolve(this);
                        this._success = true;
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _b.sent();
                        this._error = error_1;
                        reject(error_1);
                        this._success = false;
                        return [3 /*break*/, 4];
                    case 3:
                        this._complete = true;
                        if (callback !== undefined) {
                            callback(this);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AsyncWrapper;
}());
exports.AsyncWrapper = AsyncWrapper;
//# sourceMappingURL=AsyncWrapper.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = __webpack_require__(4);
var ErrorHelper_1 = __webpack_require__(2);
var ScopedLogger_1 = __webpack_require__(5);
var defaultConfig = {
    loggingVerbosity: ILogger_1.LogLevel.Info,
    useTraceMethodForTraceLogLevel: false
};
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(console, config) {
        if (config === void 0) { config = defaultConfig; }
        this._config = config;
        this._logMethod = console.log;
        this._errorMethod = console.error || this._logMethod;
        this._infoMethod = console.info || this._logMethod;
        // sometimes the trace method is wayyyy too verbose....
        this._traceMethod = config.useTraceMethodForTraceLogLevel
            ? console.trace || this._logMethod
            : this._logMethod;
        this._warnMethod = console.warn || this._logMethod;
    }
    ConsoleLogger.prototype.debug = function (msg) {
        this.log(ILogger_1.LogLevel.Debug, msg);
    };
    ConsoleLogger.prototype.debugError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Debug, message);
    };
    ConsoleLogger.prototype.error = function (msg) {
        this.log(ILogger_1.LogLevel.Error, msg);
    };
    ConsoleLogger.prototype.errorError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Error, message);
    };
    ConsoleLogger.prototype.info = function (msg) {
        this.log(ILogger_1.LogLevel.Info, msg);
    };
    ConsoleLogger.prototype.infoError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Info, message);
    };
    ConsoleLogger.prototype.trace = function (msg) {
        this.log(ILogger_1.LogLevel.Trace, msg);
    };
    ConsoleLogger.prototype.traceError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Trace, message);
    };
    ConsoleLogger.prototype.warn = function (msg) {
        this.log(ILogger_1.LogLevel.Warn, msg);
    };
    ConsoleLogger.prototype.warnError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Warn, message);
    };
    ConsoleLogger.prototype.scope = function (name) {
        return new ScopedLogger_1.ScopedLogger(this, name);
    };
    ConsoleLogger.prototype.log = function (level, msg) {
        var message = "[" + level + "] " + msg;
        switch (level) {
            case ILogger_1.LogLevel.Error:
                this._errorMethod(message);
                break;
            case ILogger_1.LogLevel.Warn:
                this._warnMethod(message);
                break;
            case ILogger_1.LogLevel.Info:
                this._infoMethod(message);
                break;
            case ILogger_1.LogLevel.Trace:
                this._traceMethod(message);
                break;
            case ILogger_1.LogLevel.Debug:
            default:
                this._logMethod(message);
                break;
        }
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function using(disposableObjectFactory, inner) {
    var disposableObject = disposableObjectFactory();
    try {
        return inner(disposableObject);
    }
    finally {
        disposableObject.dispose();
    }
}
exports.using = using;
//# sourceMappingURL=IDisposable.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Lazy = /** @class */ (function () {
    function Lazy(factory) {
        this._factory = factory;
    }
    Object.defineProperty(Lazy.prototype, "value", {
        get: function () {
            return this._value || (this._value = this._factory());
        },
        enumerable: true,
        configurable: true
    });
    return Lazy;
}());
exports.Lazy = Lazy;
//# sourceMappingURL=Lazy.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var LazyAsync = /** @class */ (function () {
    function LazyAsync(factory) {
        this._factory = factory;
    }
    Object.defineProperty(LazyAsync.prototype, "value", {
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _a, ex_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this._value !== undefined)) return [3 /*break*/, 1];
                            resolve(this._value);
                            return [3 /*break*/, 4];
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            _a = resolve;
                            return [4 /*yield*/, this._factory()];
                        case 2:
                            _a.apply(void 0, [_b.sent()]);
                            return [3 /*break*/, 4];
                        case 3:
                            ex_1 = _b.sent();
                            reject(ex_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        },
        enumerable: true,
        configurable: true
    });
    return LazyAsync;
}());
exports.LazyAsync = LazyAsync;
//# sourceMappingURL=LazyAsync.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Exceptions_1 = __webpack_require__(1);
var Strings = __webpack_require__(0);
var URI_REGEX = /^(([^:]+:\\)|([^:/?#]+:)?(\/\/([^/?#]*)[\\/])?)(([^\\/]+[\\/])*)([^/?#]*)(\?[^#]*)?(#.*)?$/gi;
var Path = /** @class */ (function () {
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = __webpack_require__(3);
/**
 * An event type that can only be invoked once. Once the event
 * is invoked, and handler that is added to it will be immediately
 * executed.
 */
var SingleInvokeEvent = /** @class */ (function (_super) {
    __extends(SingleInvokeEvent, _super);
    /**
     * Create a new singly invokable event.
     */
    function SingleInvokeEvent() {
        var _this = _super.call(this) || this;
        _this._fired = false;
        return _this;
    }
    // Add a handler to the event
    SingleInvokeEvent.prototype.addHandler = function (eventHandler) {
        _super.prototype.addHandler.call(this, eventHandler);
        if (this._fired) {
            eventHandler.call(this._sender, this._sender, this._args);
        }
        return eventHandler;
    };
    // invoke the event
    SingleInvokeEvent.prototype.invoke = function (sender, args) {
        /// <signature>
        /// <summary>Invoke the event handlers</summary>
        /// <param type='Object' name='sender'>The object that raised/owns the event</param>
        /// <param type='Object' name='sender'>Any to be passed as arguments to the handlers</param>
        /// </signature>
        if (this._fired) {
            return;
        }
        this._fired = true;
        this._sender = sender;
        this._args = args;
        _super.prototype.invoke.call(this, sender, args);
    };
    return SingleInvokeEvent;
}(Event_1.Event));
exports.SingleInvokeEvent = SingleInvokeEvent;
//# sourceMappingURL=SingleInvokeEvent.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Strings = __webpack_require__(0);
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

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncWrapper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncWrapper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AsyncWrapper__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__AsyncWrapper__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__AsyncWrapper__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConsoleLogger__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConsoleLogger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ConsoleLogger__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__ConsoleLogger__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__ConsoleLogger__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorHelper__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorHelper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ErrorHelper__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_2__ErrorHelper__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_2__ErrorHelper__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Event__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Event__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_3__Event__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_3__Event__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Exceptions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Exceptions__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_4__Exceptions__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_4__Exceptions__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__IDisposable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__IDisposable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__IDisposable__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_5__IDisposable__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_5__IDisposable__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ILogger__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ILogger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__ILogger__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_6__ILogger__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_6__ILogger__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Lazy__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Lazy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Lazy__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_7__Lazy__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_7__Lazy__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__LazyAsync__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__LazyAsync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__LazyAsync__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_8__LazyAsync__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_8__LazyAsync__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Path__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__Path__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_9__Path__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_9__Path__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ScopedLogger__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ScopedLogger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__ScopedLogger__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_10__ScopedLogger__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_10__ScopedLogger__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__SingleInvokeEvent__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__SingleInvokeEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__SingleInvokeEvent__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_11__SingleInvokeEvent__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_11__SingleInvokeEvent__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__StringBuilder__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__StringBuilder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__StringBuilder__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_12__StringBuilder__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_12__StringBuilder__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Strings__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Strings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__Strings__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_13__Strings__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_13__Strings__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Utilities__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Utilities___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__Utilities__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_14__Utilities__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_14__Utilities__[key]; }) }(__WEBPACK_IMPORT_KEY__));
















/***/ })
/******/ ]);
//# sourceMappingURL=index.debug.js.map