import ArgumentException from '../Exceptions/ArgumentException';
import Exception from '../Exceptions/Exception';
import OutOfBoundsException from '../Exceptions/OutOfBoundsException';

export interface INumberValue
{
    valueOf(): number;
    toString(): string
}

export function ensureInt(value: number, minValue: number, maxValue: number): void
{
    try
    {
        if (value > maxValue || value < minValue)
        {
            throw new ArgumentException('value', 'Value is out of bounds', new OutOfBoundsException('value', minValue, maxValue));
        }
    }
    catch (ex)
    {
        if (ex instanceof Exception)
        {
            throw new ArgumentException('value', ex.message, ex);
        }
        throw ex;
    }
}