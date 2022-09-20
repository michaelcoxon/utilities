/**
 * Sums the array of numbers.
 * @param arr
 */
export default function sum(arr: number[]): number
{
    return arr.reduce((p, c) => p + c, 0);
}
