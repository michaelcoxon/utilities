
export default function firstCharToLowerCase(str: string): string
{
    return str.charAt(0).toLowerCase() + str.slice(1);
}
