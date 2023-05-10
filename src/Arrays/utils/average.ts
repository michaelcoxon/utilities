import { isUndefined } from '../../TypeHelpers';
import { Selector } from '../../Types';
import sum from './sum';

/**
 * Returns the average of all numbers in the array
 * @param arr the array
 */

// export default function average(arr: number[]): number
// {
//     if (arr.length > 0)
//     {
//         return sum(arr) / arr.length;
//     }

//     return 0;
// }


export default function average(array: number[]): number;
export default function average<T>(array: T[], selector: Selector<T, number>): number;
export default function average<T extends number>(array: Array<T>, selector?: Selector<T, number>): number
{
    if (array.length > 0)
    {
        if (!isUndefined(selector))
        {
            return sum(array, selector) / array.length;
        }
        else
        {
            return sum(array) / array.length;
        }
    }

    return 0;
}