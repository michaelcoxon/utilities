import { ConstructorFor } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';
import where from './where.js';



export default function* ofType<T, N extends T>(iterable: Iterable<T>, ctor: ConstructorFor<N>): Iterable<N>
{
    for (const item of iterable)
    {
        if (item instanceof ctor)
        {
            yield item;
        }
    }
}