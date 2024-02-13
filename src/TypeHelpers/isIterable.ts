import isFunction from './isFunction';

export default function isIterable<T>(subject: T | Iterable<unknown>): subject is Iterable<unknown>
{
    return isFunction(subject[Symbol.iterator]);
}