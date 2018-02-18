export class ArgumentException extends Error
{
    constructor(argumentName: string, message?: string)
    {
        super("'" + argumentName + "' " + (message || ""));
        this.name = 'ArgumentException';
    }
}

export class InvalidTypeException extends Error
{
    constructor(variableName: string, expectedTypeName: string)
    {
        super('Type of ' + variableName + ' is not supported, ' + expectedTypeName + ' expected');
        this.name = 'InvalidTypeException';
    }
}

export class NotImplementedException extends Error
{
    constructor(message?: string)
    {
        super(message);
        this.name = 'NotImplementedException';
    }
}

export class NotSupportedException extends Error
{
    constructor(message?: string)
    {
        super(message);
        this.name = 'NotSupportedException';
    }
}

export class OutOfBoundsException extends Error
{
    constructor(variableName: string, minBound: number, maxBound: number)
    {
        super('The value of ' + variableName + ' is out of bounds. min: ' + minBound + ' max: ' + maxBound);
        this.name = 'OutOfBoundsException';
    }
}

export class UndefinedArgumentException extends Error
{
    constructor(argumentName: string)
    {
        super(argumentName + ' is undefined');
        this.name = 'UndefinedArgumentException';
    }
}

export class FileNotFoundException extends Error
{
    constructor(filename: string)
    {
        super(`File '${filename}' is not found`);
        this.name = 'FileNotFoundException';
    }
}

export class KeyNotFoundException<TKey> extends Error
{
    constructor(key: TKey)
    {
        super(`Key '${key}' is not found`);
        this.name = 'KeyNotFoundException';
    }
}

export class KeyAlreadyDefinedException<TKey> extends Error
{
    constructor(key: TKey)
    {
        super(`Key '${key}' is already defined`);
        this.name = 'KeyAlreadyDefinedException';
    }
}
