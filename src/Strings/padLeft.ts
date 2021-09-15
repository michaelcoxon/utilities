
export default function padLeft(str: string, length: number, padding: string): string
{
    let output = str;
    while (output.length < length)
    {
        output = padding + output;
    }
    return output;
}
