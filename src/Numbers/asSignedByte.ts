import SignedByte from './Integers/SignedByte.js';


export default function asSignedByte(value: number): SignedByte
{
    return new SignedByte(value);
}
