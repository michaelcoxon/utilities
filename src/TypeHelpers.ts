

export function isUndefined<T>(subject: T | undefined): subject is undefined
{
    return subject === undefined;
}

export function isNull<T>(subject: T | null): subject is null
{
    return subject === null;
}

export function isUndefinedOrNull<T>(subject: T | undefined | null): subject is undefined | null
{
    return subject === undefined || subject === null;
}

export function isNumber<T>(subject: T | number): subject is number
{
    return typeof subject === 'number';
}

export function isString<T>(subject: T | string): subject is string
{
    return typeof subject === 'string';
}

export function isBoolean<T>(subject: T | boolean): subject is boolean
{
    return typeof subject === 'boolean';
}

export function isDate<T>(subject: T | Date): subject is Date
{
    return subject instanceof Date;
}