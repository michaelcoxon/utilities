import { Awaitable } from '../Types';


/**
 * Wraps a value in a promise
 * @param value
 */
export default async function ensure<T>(value: T): Promise<T>;

/**
 * Ensures a PromiseLike thing is a promise
 * @param promise
 */
export default async function ensure<T>(promise: PromiseLike<T>): Promise<T>;
export default async function ensure<T>(awaitable: Awaitable<T>): Promise<T>
{
    return await awaitable;
}
