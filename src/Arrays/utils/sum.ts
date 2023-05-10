import { isUndefined } from '../../TypeHelpers';
import { Selector } from '../../Types';

/**
 * Sums the array of numbers.
 * @param arr
 */
export default function sum(array: number[]): number;
export default function sum<T>(array: T[], selector: Selector<T, number>): number;
export default function sum<T extends number>(array: T[], selector?: Selector<T, number>): number
{
    if (isUndefined(selector))
    {
        return array.reduce((p, c) => p + c, 0);
    }
    else
    {
        return array.map(selector).reduce((p, c) => p + c, 0);
    }
}