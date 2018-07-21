

export namespace Arrays
{
    export function range(start: number, length: number): number[]
    {
        const arr: number[] = [];

        for (let i = 0; i < length; i++)
        {
            arr.push(start++);
        }

        return arr;
    }

    export function sum(arr: number[]): number
    {
        return arr.reduce((p, c) => p + c, 0);
    }

    export function average(arr: number[]): number
    {
        if (arr.length > 0)
        {
            return sum(arr) / arr.length;
        }

        return 0;
    }

    
}