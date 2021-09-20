import isMultipleOf from "./isMultipleOf";


export default function isEven(value: number): boolean
{
    return isMultipleOf(value, 2);
}
