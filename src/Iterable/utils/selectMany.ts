import { Selector } from '../../Types';


export default function* selectMany<T, TOut>(iterable: Iterable<T>, selector: Selector<T, Iterable<TOut>>): Iterable<TOut>
{
    for (const item of iterable)
    {
        const inner = selector(item);
        for (const inner_item of inner)
        {
            yield inner_item;
        }
    }
}