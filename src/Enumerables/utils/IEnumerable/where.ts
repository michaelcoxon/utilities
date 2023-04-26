import { IEnumerator, WhereEnumerator } from '../../../Enumerators';
import { Predicate } from '../../../Types';
import { IEnumerable } from '../../_types';
import EnumerableBase from './EnumerableBase';





export default function where<T>(source: IEnumerable<T>, predicate: Predicate<T>): IEnumerable<T>
{
    return new WhereEnumerable(source, predicate);
}

class WhereEnumerable<T> extends EnumerableBase<T>
{
    readonly #enumerable: IEnumerable<T>;
    readonly #predicate: Predicate<T>;

    constructor(enumerable: IEnumerable<T>, predicate: Predicate<T>)
    {
        super();
        this.#enumerable = enumerable;
        this.#predicate = predicate;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new WhereEnumerator<T>(this.#enumerable.getEnumerator(), this.#predicate);
    }
}