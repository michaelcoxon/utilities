
export interface INumberValue
{
    [Symbol.toPrimitive]: (hint: string) => number;
    valueOf(): number;
    toString(): string;
}

