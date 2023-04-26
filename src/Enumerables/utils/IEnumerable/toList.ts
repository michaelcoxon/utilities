import List  from '../../List';
import { IEnumerable, IList } from '../../_types';





export default function toList<T>(source: IEnumerable<T>): IList<T>
{
    return new List<T>(source);
}