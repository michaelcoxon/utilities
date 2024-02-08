/*
https://github.com/lodash/lodash/blob/4.17.11/lodash.js#L12158
*/




/**
 * Returns true if the subject is a symbol
 * @param subject
 */

export default function isSymbol<T>(subject: T | symbol): subject is symbol
{
    return typeof subject == 'symbol';
}
