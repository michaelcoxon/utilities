import sum from './sum.js';

/**
 * Returns the average of all numbers in the array
 * @param arr the array
 */

export default function average(arr: number[]): number
{
    if (arr.length > 0)
    {
        return sum(arr) / arr.length;
    }

    return 0;
}
