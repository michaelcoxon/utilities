
export default function take<T>(array: T[], count: number): T[]
{
    return array.slice(0, count);
}