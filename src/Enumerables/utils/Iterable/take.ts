
export default function* take<T>(iterable: Iterable<T>, count: number): Iterable<T>
{
    let counter = 0;
    for (const item of iterable)
    {
        if (counter > 1)
        {
            break;
        }
        yield item;
    }
}