import isEven from './isEven.js';


export default function isOdd(value: number): boolean
{
    return !isEven(value);
}
