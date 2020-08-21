/**
 * Returns true if the subject is undefined
 * @param subject
 */
export function isUndefined<T>(subject: T | undefined): subject is undefined
{
    return subject === undefined;
}

/**
 * Returns true if the subject is null
 * @param subject
 */
export function isNull<T>(subject: T | null): subject is null
{
    return subject === null;
}

/**
 * Returns true if the subject in undefined or null
 * @param subject
 */
export function isUndefinedOrNull<T>(subject: T | undefined | null): subject is undefined | null
{
    return isUndefined(subject) || isNull(subject);
}

/**
 * Returns true if the subject is a number
 * @param subject
 */
export function isObject<T>(subject: T | object): subject is object
{
    return typeof subject === 'object';
}

/**
 * Returns true if the subject is a number
 * @param subject
 */
export function isNumber<T>(subject: T | number): subject is number
{
    return typeof subject === 'number';
}

/**
 * Returns true if the subject is a string
 * @param subject
 */
export function isString<T>(subject: T | string): subject is string
{
    return typeof subject === 'string';
}

/**
 * Returns true if the subject is a boolean
 * @param subject
 */
export function isBoolean<T>(subject: T | boolean): subject is boolean
{
    return typeof subject === 'boolean';
}

/**
 * Returns true if the subject is a date
 * @param subject
 */
export function isDate<T>(subject: T | Date): subject is Date
{
    return subject instanceof Date;
}

/**
 * Returns true if the subject is a Function.
 * @param subject
 */
export function isFunction<T>(subject: T | Function): subject is Function
{
    return Object.prototype.toString.call(subject) === '[object Function]';
}
