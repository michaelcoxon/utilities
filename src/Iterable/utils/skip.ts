import { ArgumentException } from '../../Exceptions';
export default function* skip<T>(iterable: Iterable<T>, count: number): Iterable<T>
{
    if (count < 0)
    {
        throw new ArgumentException('count', "count cannot be less than 0.");
    }

    let c = 0;
    for (const input of iterable)
    {
        if (c < count)
        {
            c++;
            continue;
        }
        yield input;
    }
}