import { Undefinable } from "../Types";

/**
 * Interface for implementing your own state
 */

export interface IModelState<T>
{
    subscribe(postCallback: (value: Undefinable<T>) => void, preCallback?: (value: Undefinable<T>) => void): string;
    unsubscribe(key: string): void;
    toString(): string;
    readonly value: Undefinable<T>;
    valueOf(): Undefinable<T>;
}
