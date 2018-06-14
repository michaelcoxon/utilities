import { Promisable } from "./Types";
import { resolve } from "url";



export namespace Promises
{
    /**
     * Wraps a value in a promise
     * @param value
     */
    export function ensure<T>(value: T): PromiseLike<T>;
    /**
     * Ensures a promiselike thing is a promise
     * @param promise
     */
    export function ensure<T>(promise: PromiseLike<T>): PromiseLike<T>;
    export function ensure<T>(promisable: Promisable<T>): PromiseLike<T>
    {
        return new Promise<T>(async (resolve, reject) =>
        {
            try
            {
                resolve(await promisable);
            }
            catch (error)
            {
                reject(error);
            }
        });
    }

    /**
     * Creates a promise from an action
     * @param action
     */
    export function create(action: () => void): PromiseLike<void>;
    /**
     * Creates a promise from a promise factory
     * @param promiseFactory
     */
    export function create(promiseFactory: () => PromiseLike<void>): PromiseLike<void>;
    /**
     * Creates a promise from a factory
     * @param factory
     */
    export function create<T>(factory: () => T): PromiseLike<T>;
    /**
     * Creates a promise from a promise factory 
     * @param promiseFactory
     */
    export function create<T>(promiseFactory: () => PromiseLike<T>): PromiseLike<T>;
    export function create<T>(promisableFactory: () => Promisable<T>): PromiseLike<T>
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                resolve(await promisableFactory());
            }
            catch (error)
            {
                reject(error);
            }
        });
    }
}
