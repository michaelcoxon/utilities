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
var Strings = require("./Strings");
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
var NullReferenceException = /** @class */ (function (_super) {
    __extends(NullReferenceException, _super);
    function NullReferenceException(message, innerException) {
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
        _this.name = 'NullReferenceException';
        return _this;
    }
    return NullReferenceException;
}(Exception));
exports.NullReferenceException = NullReferenceException;
//# sourceMappingURL=Exceptions.js.map