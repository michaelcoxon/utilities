import List from '../../List';
import { IList } from '../../_types';


export default function toList<T>(array: T[]): IList<T>
{
    return new List(array);
}