import { IEnumerator, SelectEnumerator } from '../../../Enumerators';
import { Selector } from '../../../Types';
import { IEnumerable } from '../../_types';
import EnumerableBase  from './EnumerableBase';

export default function select<T, TOut>(source:IEnumerable<T>,selector: Selector<T, TOut>): IEnumerable<TOut>
{
    return new SelectEnumerable<T, TOut>(source, selector);
}

class SelectEnumerable<T, TReturn> extends EnumerableBase<TReturn>
{
    readonly #enumerable: IEnumerable<T>;
    readonly #selector: Selector<T, TReturn>;

    constructor(enumerable: IEnumerable<T>, selector: Selector<T, TReturn>)
    {
        super();
        this.#enumerable = enumerable;
        this.#selector = selector;
    }

    public getEnumerator(): IEnumerator<TReturn>
    {
        return new SelectEnumerator<T, TReturn>(this.#enumerable.getEnumerator(), this.#selector);
    }
}
