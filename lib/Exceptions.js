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
var ArgumentException = (function (_super) {
    __extends(ArgumentException, _super);
    function ArgumentException(argumentName, message) {
        var _this = _super.call(this, "'" + argumentName + "' " + (message || "")) || this;
        _this.name = 'ArgumentException';
        return _this;
    }
    return ArgumentException;
}(Error));
exports.ArgumentException = ArgumentException;
var InvalidTypeException = (function (_super) {
    __extends(InvalidTypeException, _super);
    function InvalidTypeException(variableName, expectedTypeName) {
        var _this = _super.call(this, 'Type of ' + variableName + ' is not supported, ' + expectedTypeName + ' expected') || this;
        _this.name = 'InvalidTypeException';
        return _this;
    }
    return InvalidTypeException;
}(Error));
exports.InvalidTypeException = InvalidTypeException;
var NotImplementedException = (function (_super) {
    __extends(NotImplementedException, _super);
    function NotImplementedException(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'NotImplementedException';
        return _this;
    }
    return NotImplementedException;
}(Error));
exports.NotImplementedException = NotImplementedException;
var NotSupportedException = (function (_super) {
    __extends(NotSupportedException, _super);
    function NotSupportedException(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'NotSupportedException';
        return _this;
    }
    return NotSupportedException;
}(Error));
exports.NotSupportedException = NotSupportedException;
var OutOfBoundsException = (function (_super) {
    __extends(OutOfBoundsException, _super);
    function OutOfBoundsException(variableName, minBound, maxBound) {
        var _this = _super.call(this, 'The value of ' + variableName + ' is out of bounds. min: ' + minBound + ' max: ' + maxBound) || this;
        _this.name = 'OutOfBoundsException';
        return _this;
    }
    return OutOfBoundsException;
}(Error));
exports.OutOfBoundsException = OutOfBoundsException;
var UndefinedArgumentException = (function (_super) {
    __extends(UndefinedArgumentException, _super);
    function UndefinedArgumentException(argumentName) {
        var _this = _super.call(this, argumentName + ' is undefined') || this;
        _this.name = 'UndefinedArgumentException';
        return _this;
    }
    return UndefinedArgumentException;
}(Error));
exports.UndefinedArgumentException = UndefinedArgumentException;
var FileNotFoundException = (function (_super) {
    __extends(FileNotFoundException, _super);
    function FileNotFoundException(filename) {
        var _this = _super.call(this, "File '" + filename + "' is not found") || this;
        _this.name = 'FileNotFoundException';
        return _this;
    }
    return FileNotFoundException;
}(Error));
exports.FileNotFoundException = FileNotFoundException;
var KeyNotFoundException = (function (_super) {
    __extends(KeyNotFoundException, _super);
    function KeyNotFoundException(key) {
        var _this = _super.call(this, "Key '" + key + "' is not found") || this;
        _this.name = 'KeyNotFoundException';
        return _this;
    }
    return KeyNotFoundException;
}(Error));
exports.KeyNotFoundException = KeyNotFoundException;
var KeyAlreadyDefinedException = (function (_super) {
    __extends(KeyAlreadyDefinedException, _super);
    function KeyAlreadyDefinedException(key) {
        var _this = _super.call(this, "Key '" + key + "' is already defined") || this;
        _this.name = 'KeyAlreadyDefinedException';
        return _this;
    }
    return KeyAlreadyDefinedException;
}(Error));
exports.KeyAlreadyDefinedException = KeyAlreadyDefinedException;
//# sourceMappingURL=Exceptions.js.map