import { IEnumerator, SkipEnumerator } from '../../../Enumerators';
import { IEnumerable } from '../../_types';
import EnumerableBase from './EnumerableBase';

export default function skip<T>(source: IEnumerable<T>, count: number): IEnumerable<T>
{
    return new SkipEnumerable(source, count);
}

class SkipEnumerable<T> extends EnumerableBase<T>
{
    readonly #enumerable: IEnumerable<T>;
    #itemsToSkip: number;

    constructor(enumerable: IEnumerable<T>, itemsToSkip: number)
    {
        super();
        this.#enumerable = enumerable;
        this.#itemsToSkip = itemsToSkip;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new SkipEnumerator<T>(this.#enumerable.getEnumerator(), this.#itemsToSkip);
    }
}
