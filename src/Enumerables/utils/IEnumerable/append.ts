import { AppendEnumerator } from '../../../Enumerators';
import { EnumeratorEnumerable } from '../../EnumeratorEnumerable';
import { IEnumerable } from '../../_types';
import asEnumerable from '../asEnumerable';


export default function append<T>(source: IEnumerable<T>, item: T): IEnumerable<T>
{
    return new EnumeratorEnumerable(new AppendEnumerator(source.getEnumerator(), asEnumerable([item]).getEnumerator()));
}