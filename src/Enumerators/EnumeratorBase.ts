import { Undefinable } from '../Types';
import { IEnumerator } from "./IEnumerator";


export default abstract class EnumeratorBase<T> implements IEnumerator<T>
{
    abstract readonly current: T;
    abstract moveNext(): boolean;
    abstract peek(): Undefinable<T>;
    abstract reset(): void;
    public readonly return?: (value?: T) => IteratorResult<T, T>;
    public readonly throw?: (e?: T) => IteratorResult<T, T>;
    public next(...args: []): IteratorResult<T, T>
    {
        args.length;
        const done = !this.moveNext();
        const value = done ? undefined : this.current;
        return { done, value: value as T };
    }
}
