"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings_1 = require("./Strings");
const SR = {
    "ArgumentUndefinedException_message": "'{0}' is undefined",
    "ArgumentNullException_message": "'{0}' is null",
    "InvalidTypeException_message": "Type of '{0}' is not supported. Expected: '{1}'. {2}",
    "OutOfBoundsException_message": "The value of '{0}' is out of bounds. min: '{1}', max: '{2}",
    "IndexOutOfRangeException_message": "The index of '{0}' on '{1}' is out of bounds. min: '{2}', max: '{3}'",
    "FileNotFoundException_message": "File '{0}' is not found",
    "KeyNotFoundException_message": "Key '{0}' is not found",
    "KeyAlreadyDefinedException_message": "Key '{0}' is already defined"
};
/**
 * Represents errors that occur during application execution.
 */
class Exception extends Error {
    constructor(message, innerException) {
        const trueProto = new.target.prototype;
        super(message);
        // Alternatively use Object.setPrototypeOf if you have an ES6 environment.
        this.__proto__ = trueProto;
        this._innerException = innerException;
    }
    /** Gets the Exception instance that caused the current exception. */
    get innerException() {
        return this._innerException;
    }
    static isException(error) {
        return error['innerException'] !== undefined;
    }
}
exports.Exception = Exception;
class ErrorException extends Exception {
    constructor(error) {
        super();
        this.name = error.name;
        this.message = error.message;
        this.stack = error.stack;
    }
}
exports.ErrorException = ErrorException;
/**
 * The exception that is thrown when one of the arguments provided to a method is not valid.
 */
class ArgumentException extends Exception {
    constructor(argumentName, message, innerException) {
        const _message = `'${argumentName}' ${message}`;
        if (innerException) {
            super(_message, innerException);
        }
        else {
            super(_message);
        }
        this.name = 'ArgumentException';
    }
}
exports.ArgumentException = ArgumentException;
class ArgumentUndefinedException extends ArgumentException {
    constructor(argumentName, innerException) {
        const _message = Strings_1.Strings.format(SR.ArgumentUndefinedException_message, argumentName);
        if (innerException) {
            super(argumentName, _message, innerException);
        }
        else {
            super(argumentName, _message);
        }
        this.name = 'ArgumentUndefinedException';
    }
}
exports.ArgumentUndefinedException = ArgumentUndefinedException;
class ArgumentNullException extends ArgumentException {
    constructor(argumentName, innerException) {
        const _message = Strings_1.Strings.format(SR.ArgumentNullException_message, argumentName);
        if (innerException) {
            super(argumentName, _message, innerException);
        }
        else {
            super(argumentName, _message);
        }
        this.name = 'ArgumentNullException';
    }
}
exports.ArgumentNullException = ArgumentNullException;
class InvalidTypeException extends Exception {
    constructor(variableName, expectedTypeName, message, innerException) {
        const _message = Strings_1.Strings.format(SR.InvalidTypeException_message, variableName, expectedTypeName, message !== undefined ? message : Strings_1.Strings.empty);
        if (innerException) {
            super(_message, innerException);
        }
        else {
            super(_message);
        }
        this.name = 'InvalidTypeException';
    }
}
exports.InvalidTypeException = InvalidTypeException;
class NotImplementedException extends Exception {
    constructor(message, innerException) {
        if (innerException) {
            super(message, innerException);
        }
        else {
            if (message) {
                super(message);
            }
            else {
                super();
            }
        }
        this.name = 'NotImplementedException';
    }
}
exports.NotImplementedException = NotImplementedException;
class NotSupportedException extends Exception {
    constructor(message, innerException) {
        if (innerException) {
            super(message, innerException);
        }
        else {
            if (message) {
                super(message);
            }
            else {
                super();
            }
        }
        this.name = 'NotSupportedException';
    }
}
exports.NotSupportedException = NotSupportedException;
class OutOfBoundsException extends Exception {
    constructor(variableName, minBound, maxBound, innerException) {
        const _message = Strings_1.Strings.format(SR.OutOfBoundsException_message, variableName, minBound, maxBound);
        if (innerException) {
            super(_message, innerException);
        }
        else {
            super(_message);
        }
        this.name = 'OutOfBoundsException';
    }
}
exports.OutOfBoundsException = OutOfBoundsException;
class IndexOutOfRangeException extends Exception {
    constructor(variableName, index, minBound, maxBound, innerException) {
        const _message = Strings_1.Strings.format(SR.IndexOutOfRangeException_message, index, variableName, minBound, maxBound);
        if (innerException) {
            super(_message, innerException);
        }
        else {
            super(_message);
        }
        this.name = 'OutOfBoundsException';
    }
}
exports.IndexOutOfRangeException = IndexOutOfRangeException;
class FileNotFoundException extends Exception {
    constructor(filename, innerException) {
        const _message = Strings_1.Strings.format(SR.FileNotFoundException_message, filename);
        if (innerException) {
            super(_message, innerException);
        }
        else {
            super(_message);
        }
        this.name = 'FileNotFoundException';
    }
}
exports.FileNotFoundException = FileNotFoundException;
class KeyNotFoundException extends Exception {
    constructor(key, innerException) {
        const _message = Strings_1.Strings.format(SR.KeyNotFoundException_message, key);
        if (innerException) {
            super(_message, innerException);
        }
        else {
            super(_message);
        }
        this.name = 'KeyNotFoundException';
    }
}
exports.KeyNotFoundException = KeyNotFoundException;
class KeyAlreadyDefinedException extends Exception {
    constructor(key, innerException) {
        const _message = Strings_1.Strings.format(SR.KeyAlreadyDefinedException_message, key);
        if (innerException) {
            super(_message, innerException);
        }
        else {
            super(_message);
        }
        this.name = 'KeyAlreadyDefinedException';
    }
}
exports.KeyAlreadyDefinedException = KeyAlreadyDefinedException;
class NullReferenceException extends Exception {
    constructor(message, innerException) {
        if (innerException) {
            super(message, innerException);
        }
        else {
            if (message) {
                super(message);
            }
            else {
                super();
            }
        }
        this.name = 'NullReferenceException';
    }
}
exports.NullReferenceException = NullReferenceException;
class AlreadyDisposedException extends Exception {
    constructor(message, innerException) {
        if (innerException) {
            super(message, innerException);
        }
        else {
            if (message) {
                super(message);
            }
            else {
                super();
            }
        }
        this.name = 'AlreadyDisposedException';
    }
}
exports.AlreadyDisposedException = AlreadyDisposedException;
class FormatException extends Exception {
    constructor(message, innerException) {
        if (innerException) {
            super(message, innerException);
        }
        else {
            if (message) {
                super(message);
            }
            else {
                super();
            }
        }
        this.name = 'FormatException';
    }
}
exports.FormatException = FormatException;
//# sourceMappingURL=Exceptions.js.map