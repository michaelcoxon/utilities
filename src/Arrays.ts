// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Arrays
{
    /**
     * Returns the average of all numbers in the array
     * @param arr the array
     */
    export function average(arr: number[]): number
    {
        if (arr.length > 0)
        {
            return sum(arr) / arr.length;
        }

        return 0;
    }

    /**
     * Returns true if the sequence is equal
     * @param a array 1
     * @param b array 2
     * @param anyOrder set to true if you do not care about the order of the arrays
     */
    export function sequenceEqual<T>(a: T[], b: T[], anyOrder = false)
    {
        if (a === b)
        {
            return true;
        }
        if (a == null || b == null)
        {
            return false;
        }
        if (a.length != b.length)
        {
            return false;
        }

        if (anyOrder)
        {
            a = [...a].sort();
            b = [...b].sort();
        }

        for (let i = 0; i < a.length; ++i)
        {
            if (a[i] !== b[i])
            {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns an array of the range of numbers from the start number for the specified length
     * @param start the start number
     * @param length the specified length
     */
    export function range(start: number, length: number): number[]
    {
        const arr: number[] = [];

        for (let i = 0; i < length; i++)
        {
            arr.push(start++);
        }

        return arr;
    }

    /**
     * Sums the array of numbers.
     * @param arr
     */
    export function sum(arr: number[]): number
    {
        return arr.reduce((p, c) => p + c, 0);
    }
}

export default Arrays;
