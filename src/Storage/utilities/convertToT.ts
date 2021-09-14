export default function convertToT<T>(value: string): T
{
    return JSON.parse(value);
}
