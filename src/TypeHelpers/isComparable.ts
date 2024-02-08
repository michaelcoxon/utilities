import { isString } from 'lodash';
import { IComparable } from '../Comparers/_types';

export default function isComparable(subject: unknown): subject is IComparable
{
    return isString(subject) || !isNaN(+subject!);
}