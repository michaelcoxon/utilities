
export type INumberValue  = Number &
{
    [Symbol.toPrimitive]: (hint: string) => number;
    valueOf(): number;
    toString(): string;
}

