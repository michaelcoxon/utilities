export default function contains<T>(iterable: Iterable<T>, item: T): boolean
{
    for (const v of iterable)
    {
        if (v === item)
        {
            return true;
        }
    }

    return false;
}