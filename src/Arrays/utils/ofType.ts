import { ConstructorFor } from '../../Types';


export default function ofType<T, N extends T>(array: T[], ctor: ConstructorFor<N>): N[]
{
    const result: N[] = [];
    for (const item of array)
    {
        if (item instanceof ctor)
        {
            result.push(item);
        }
    }
    return result;
}