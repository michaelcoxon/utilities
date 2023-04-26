import { Selector } from '../../../Types';
import { IEnumerable } from '../../_types';
import { IEnumerator, SelectManyEnumerator } from '../../../Enumerators';
import EnumerableBase  from './EnumerableBase';



export default function selectMany<T, TOut>(source: IEnumerable<T>, selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>
{
    return new SelectManyEnumerable<T, TOut>(source, selector);
}


class SelectManyEnumerable<T, TReturn> extends EnumerableBase<TReturn>
{
    readonly #enumerable: IEnumerable<T>;
    readonly #selector: Selector<T, IEnumerable<TReturn>>;

    constructor(enumerable: IEnumerable<T>, selector: Selector<T, IEnumerable<TReturn>>)
    {
        super();
        this.#enumerable = enumerable;
        this.#selector = selector;
    }

    public getEnumerator(): IEnumerator<TReturn>
    {
        return new SelectManyEnumerator<T, TReturn>(this.#enumerable.getEnumerator(), this.#selector);
    }
}
