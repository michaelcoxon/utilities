
export type INumberValue  = number &
{
    [Symbol.toPrimitive]: (hint: string) => number;
    valueOf(): number;
    toString(): string;
}

