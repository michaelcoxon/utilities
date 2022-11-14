import { IComparable } from '../Comparers/_types.js';

export default function isComparable(subject: any): subject is IComparable
{
    return typeof(subject) === 'string' || !isNaN(+subject);
}