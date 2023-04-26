
export default function asArray<T>(iterable: Iterable<T>): T[]
{
    return [...iterable];
}