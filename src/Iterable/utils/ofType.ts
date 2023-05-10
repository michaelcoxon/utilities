import { ConstructorFor } from '../../Types';

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