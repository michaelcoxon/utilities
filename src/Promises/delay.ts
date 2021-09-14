/**
 * Delays for the number of milliseconds
 * @param ms
 */

export default function delay(ms: number): Promise<void>
{
    return new Promise<void>((resolve) =>
    {
        const timeout = setTimeout(() =>
        {
            if (timeout)
            {
                clearTimeout(timeout);
            }
            resolve();
        }, ms);
    });
}
