import isEven from './isEven';


export default function isOdd(value: number): boolean
{
    return !isEven(value);
}
