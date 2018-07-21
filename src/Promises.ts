import { Promisable } from "./Types";
import { resolve } from "url";

declare function clearTimeout(intervalId: any): void;
declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;


export namespace Promises
{
    /**
     * Delays for the number of milliseconds
     * @param ms
     */
    export function delay(ms: number): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            const timeout = setTimeout(() =>
            {
                if (timeout)
                {
                    clearTimeout(timeout);
                }
                resolve();
            }, ms);
        });
    }

    /** Returns a new resolved Promise */
    export function resolved(): Promise<void>
    {
        return new Promise<void>(resolve => resolve());
    }

    /** Returns a new rejected Promise */
    export function rejected(reason?: any): Promise<void>
    {
        return new Promise<void>((resolve, reject) => reject(reason));
    }

    /**
     * Wraps a value in a promise
     * @param value
     */
    export function ensure<T>(value: T): Promise<T>;

    /**
     * Ensures a PromiseLike thing is a promise
     * @param promise
     */
    export function ensure<T>(promise: PromiseLike<T>): Promise<T>;
    export function ensure<T>(promisable: Promisable<T>): Promise<T>
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
    export function create(action: () => void): Promise<void>;
    /**
     * Creates a promise from a promise factory
     * @param promiseFactory
     */
    export function create(promiseFactory: () => Promise<void>): Promise<void>;
    /**
     * Creates a promise from a factory
     * @param factory
     */
    export function create<T>(factory: () => T): Promise<T>;
    /**
     * Creates a promise from a promise factory 
     * @param promiseFactory
     */
    export function create<T>(promiseFactory: () => Promise<T>): Promise<T>;
    export function create<T>(promisableFactory: () => Promisable<T>): Promise<T>
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
