import { IComparable } from '../Comparers/_types';

export default function isComparable(subject: any): subject is IComparable
{
    return !isNaN(+subject);
}