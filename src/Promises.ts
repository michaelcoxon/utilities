import { Promisable } from "./Types";
import { resolve } from "url";



export namespace Promises
{
    export function ensure<T>(value: T): PromiseLike<T>;
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
     * Creates a promise froma an action
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
