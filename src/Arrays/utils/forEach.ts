

export default function forEach<T>(array: T[], callback: (value: T, index: number) => boolean | void): void
{
    let index = 0;
    for (const item of array)
    {
        const value = callback(item, index);
        if (value === false)
        {
            break;
        }
        index++;
    }
}