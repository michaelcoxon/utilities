import isMultipleOf from "./isMultipleOf.js";


export default function isEven(value: number): boolean
{
    return isMultipleOf(value, 2);
}
