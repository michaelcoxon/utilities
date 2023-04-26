import { IEnumerable } from '../../_types';
import asEnumerable from '../asEnumerable';
import concat from './concat';


export default function append<T>(source: IEnumerable<T>, item: T): IEnumerable<T>
{
    return concat(source, asEnumerable([item]));
}