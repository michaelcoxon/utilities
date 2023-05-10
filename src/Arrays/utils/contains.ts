
export default function contains<T>(iterable: T[], item: T): boolean
{
    return iterable.indexOf(item) > -1;
}