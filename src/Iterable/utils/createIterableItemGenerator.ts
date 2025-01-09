

export default function* createIterableItemGenerator<T>(iterable: Iterable<T>): Generator<T, void, unknown>
{
    for (const item of iterable)
    {
        yield item;
    }
}
