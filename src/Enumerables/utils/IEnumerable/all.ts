import { Predicate } from '../../../Types';
import { IEnumerable } from '../../_types';


export default function all<T>(enumerable: IEnumerable<T>, predicate: Predicate<T>): boolean
{
    let output = true;
    const en = enumerable.getEnumerator();

    while (output && en.moveNext())
    {
        output = predicate(en.current);
    }

    return output;
}