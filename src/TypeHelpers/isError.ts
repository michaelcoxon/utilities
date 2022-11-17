
export default function isError(subject: unknown | Error): subject is Error
{
    if (subject instanceof Error)
    {
        return true;
    }
    return false;
}
