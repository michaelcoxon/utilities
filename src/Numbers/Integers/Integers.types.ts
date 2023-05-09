
export interface INumberValue extends Number
{
    [Symbol.toPrimitive]: (hint: string) => number;
    valueOf(): number;
    toString(): string;
}

