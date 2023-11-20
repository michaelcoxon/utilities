import { Awaitable } from '../Types';


/**
 * Creates a promise from an action
 * @param action
 */
export default function create(action: () => void): Promise<void>;
/**
 * Creates a promise from a promise factory
 * @param promiseFactory
 */
export default function create(promiseFactory: () => Promise<void>): Promise<void>;
/**
 * Creates a promise from a factory
 * @param factory
 */
export default function create<T>(factory: () => T): Promise<T>;
/**
 * Creates a promise from a promise factory 
 * @param promiseFactory
 */
export default function create<T>(promiseFactory: () => Promise<T>): Promise<T>;
export default function create<T>(awaitableFactory: () => Awaitable<T>): Promise<T>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            resolve(await awaitableFactory());
        }
        catch (error)
        {
            reject(error);
        }
    });
}
