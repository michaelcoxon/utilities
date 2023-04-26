import RangeEnumerator from "../Enumerators/RangeEnumerator";
import { IEnumerator } from '../Enumerators/_types';
import EnumerableBase from './utils/IEnumerable/EnumerableBase';

export class RangeEnumerable extends EnumerableBase<number> {
    readonly #start: number;
    readonly #count: number;

    constructor(start: number, count: number)
    {
        super();
        this.#start = start;
        this.#count = count;
    }

    public getEnumerator(): IEnumerator<number>
    {
        return new RangeEnumerator(this.#start, this.#count);
    }
}
