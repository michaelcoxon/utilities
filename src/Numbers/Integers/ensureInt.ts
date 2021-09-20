import OutOfBoundsException from '../../Exceptions/OutOfBoundsException';


export function ensureInt(value: number, minValue: number, maxValue: number): void
{
    if (value > maxValue || value < minValue)
    {
        throw new OutOfBoundsException('value', minValue, maxValue);
    }
}
