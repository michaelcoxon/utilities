import { Predicate } from '../../../Types';


export default function where<T>(array: T[], predicate: Predicate<T>): T[]
{
    return array.filter(predicate);
}
