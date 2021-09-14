export default function convertToString<T>(value: T): string
{
    return JSON.stringify(value);
}
