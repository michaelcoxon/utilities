import isFunction from './isFunction';

export default function isIterable(subject: any): subject is Iterable<unknown>
{
    return isFunction(subject[Symbol.iterator]);
}