import { AppendEnumerator } from '../../../Enumerators';
import { EnumeratorEnumerable } from '../../EnumeratorEnumerable';
import { IEnumerable } from '../../_types';



export default function concat<T>(source: IEnumerable<T>, next: IEnumerable<T>): IEnumerable<T>
{
    return new EnumeratorEnumerable(new AppendEnumerator(source.getEnumerator(), next.getEnumerator()));
}
