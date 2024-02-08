/**
 * Returns true if the subject in undefined or null
 * @param subject
 */

import isNull from './isNull';
import isUndefined from './isUndefined';

export default function isUndefinedOrNull<T>(subject: T | undefined | null): subject is undefined | null
{
    return isUndefined(subject) || isNull(subject);
}


// idea is everything provided by `subjects` is (isUndefined(arg1) && isUndefined(arg2) && isUndefined(...) ...)
// function isUndefinedOrNullMany<T>(subjects: (T | undefined | null)[]): subjects is (undefined | null)[]
// {
//     for(const subject of subjects)
//     {
//         if(isUndefined(subject) || isNull(subject))
//         {

//         }
//     }
// }