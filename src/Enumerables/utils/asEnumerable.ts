import IterableEnumerator from '../../Enumerators/IterableEnumerator';
import ArrayEnumerable from '../ArrayEnumerable';
import { EnumeratorEnumerable } from '../EnumeratorEnumerable';
import { IEnumerable } from '../_types';




export default function asEnumerable<T>(iterable: Iterable<T>): IEnumerable<T>
{
    if (Array.isArray(iterable))
    {
        return new ArrayEnumerable([...iterable]);
    }
    else
    {
        return new EnumeratorEnumerable(new IterableEnumerator(iterable));
    }
}