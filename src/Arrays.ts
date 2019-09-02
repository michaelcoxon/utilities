import { isUndefinedOrNull } from './TypeHelpers';


export namespace Arrays
{
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
    export function sum(...arr: number[]): number
    export function sum(arr: number[]): number
    export function sum(arr: any): number
    {
        arr = Array.from(arguments);
        return arr.reduce((p, c) => p + c, 0);
    }

    /**
     * Returns the average of all numbers in the array
     * @param arr the array
     */
    export function average(...arr: number[]): number;
    export function average(arr: number[]): number;
    export function average(arr: any): number
    {
        arr = Array.from(arguments);
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
    export function sequenceEqual<T>(a: T[], b: T[], anyOrder: boolean = false)
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
     * Returns true if the array is null, undefined or empty
     * @param a the array
     */
    export function isNullOrEmpty<T>(a?: T[] | null): boolean
    {
        return isUndefinedOrNull(a) || a.length == 0
    }
}