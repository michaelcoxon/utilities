import { AnyFunction } from '../Types';

/**
 * Returns true if the subject is a Function.
 * @param subject
 */

export default function isFunction<T>(subject: T | AnyFunction): subject is AnyFunction
{
    return typeof subject === 'function';
    //return Object.prototype.toString.call(subject) === '[object Function]';
}
