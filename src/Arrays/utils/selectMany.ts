import { Selector } from '../../Types';


export default function selectMany<T, TOut>(array: Array<T>, selector: Selector<T, Array<TOut>>): Array<TOut>
{
    return array.reduce(
        (results: TOut[], t: T) => [...results, ...selector(t)],
        []
    );
}