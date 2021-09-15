/**
 * Returns an array of the range of numbers from the start number for the specified length
 * @param start the start number
 * @param length the specified length
 */

export default function range(start: number, length: number): number[]
{
    const arr: number[] = [];

    for (let i = 0; i < length; i++)
    {
        arr.push(start++);
    }

    return arr;
}
