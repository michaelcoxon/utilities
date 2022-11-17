

export default function isAwaitable<T>(subject: T | PromiseLike<T>): subject is PromiseLike<T>
{
    return subject['then'] !== undefined;
}
