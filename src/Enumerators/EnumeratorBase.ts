import { Undefinable } from '../Types';
import { IEnumerator } from './_types';

export default abstract class EnumeratorBase<T> implements IEnumerator<T>
{
    abstract readonly current: T;
    abstract moveNext(): boolean;
    abstract peek(): Undefinable<T>;
    abstract reset(): void;

    public next(/*...args: []*/): IteratorResult<T, T>
    {
        //args.length;
        const isDone = !this.moveNext();
        const value = isDone ? undefined : this.current;
        return { done: isDone, value: value as T };
    }
    // TODO: implement these
    public readonly return?: (value?: T) => IteratorResult<T, T>;
    public readonly throw?: (e?: T) => IteratorResult<T, T>;
}
