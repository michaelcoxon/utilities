import { Awaitable } from '../Types';


/**
 * Wraps a value in a promise if required
 * @param value
 */
export default async function ensurePromise<T>(awaitable: Awaitable<T>): Promise<T>
{
    return await awaitable;
}
