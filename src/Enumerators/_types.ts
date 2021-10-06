import { Undefinable } from '../Types';

/**
 * Enumrates an object source for values.
 */
export interface IEnumerator<T> extends Iterator<T>
{
    /** value of the current element */
    readonly current: T

    /** move to the next element. Returns false if there is no next element */
    moveNext(): boolean

    /** returns the next element without moving the pointer forwards */
    peek(): Undefinable<T>

    /** reset the pointer to the start */
    reset(): void
}

export interface IAsyncEnumerator<T>
{
    /** value of the current element */
    readonly current: T

    /** move to the next element. Returns false if there is no next element */
    moveNextAsync(): Promise<boolean>
}