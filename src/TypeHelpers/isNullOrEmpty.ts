/**
 * Returns true if the value is undefined, null or empty
 * @param lengthable
 */
export default function isNullOrEmpty(value?: { length: number; } | null | undefined): value is null | undefined
{
    return value === undefined || value === null || value.length == 0;
}
