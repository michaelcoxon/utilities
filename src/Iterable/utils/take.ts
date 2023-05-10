
export default function* take<T>(iterable: Iterable<T>, count: number): Iterable<T>
{
    for (const item of iterable)
    {
        if (count == 0)
        {
            break;
        }
        yield item;
        count--;
    }
}