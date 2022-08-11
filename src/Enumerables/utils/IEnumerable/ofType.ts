import { ConstructorFor } from '../../../Types';
import { IEnumerable } from '../../_types';



export default function ofType<T, N extends T>(enumerable: IEnumerable<T>, ctor: ConstructorFor<N>): IEnumerable<N>
{
    return enumerable.where((item) => item instanceof ctor) as IEnumerable<N>;
}