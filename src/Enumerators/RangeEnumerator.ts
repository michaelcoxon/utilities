import { IEnumerator } from './_types.js';
import EnumeratorBase from "./EnumeratorBase.js";
import ArgumentException from '../Exceptions/ArgumentException.js';
import Exception from '../Exceptions/Exception.js';
import { Undefinable } from '../Types.js';


export default class RangeEnumerator extends EnumeratorBase<number> implements IEnumerator<number>
{
    readonly #start: number;
    readonly #count: number;
    readonly #increment: number;

    #current?: number;
    #iterations: number;


    constructor(start: number, count: number)
    {
        super();
        const integer = start > 0 ? Math.floor(start) : Math.ceil(start);
        if (start != integer)
        {
            throw new ArgumentException("Only integers are supported");
        }

        this.#start = start;
        this.#count = count;

        this.#iterations = -1;
        this.#increment = 1;
    }

    public get current(): number
    {
        if (this.#iterations < 0)
        {
            throw new Exception("Call moveNext first");
        }
        if (this.#current === undefined)
        {
            throw new Exception("Current is undefined");
        }
        return this.#current;
    }

    public moveNext(): boolean
    {
        this.#current = this.peek();

        if (this.#current === undefined)
        {
            return false;
        }

        this.#iterations++;
        return true;
    }

    public peek(): Undefinable<number>
    {
        const index = this.#iterations + 1;
        const value = this.#start + (index * this.#increment);

        if (index < this.#count)
        {
            return value;
        }
    }

    public reset(): void
    {
        this.#iterations = -1;
    }
}
