import { Predicate } from '../../../Types';
import { IEnumerable } from '../../_types';



export default function any<T>(enumerable:IEnumerable<T>, predicate?: Predicate<T>): boolean
{
    const en = enumerable.getEnumerator();

    if (predicate !== undefined)
    {
        let output = false;

        while (!output && en.moveNext())
        {
            output = predicate(en.current);
        }

        return output;
    }
    else
    {
        return en.moveNext();
    }
}