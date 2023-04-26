import { IEnumerator, TakeEnumerator } from '../../../Enumerators';
import { IEnumerable } from '../../_types';
import { EnumerableBase } from './EnumerableBase';



export default function take<T>(source: IEnumerable<T>, count: number): IEnumerable<T>
{
    return new TakeEnumerable(source, count);
}

class TakeEnumerable<T> extends EnumerableBase<T>
{
    readonly #enumerable: IEnumerable<T>;
    #itemsToTake: number;

    constructor(enumerable: IEnumerable<T>, itemsToTake: number)
    {
        super();
        this.#enumerable = enumerable;
        this.#itemsToTake = itemsToTake;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new TakeEnumerator<T>(this.#enumerable.getEnumerator(), this.#itemsToTake);
    }
}