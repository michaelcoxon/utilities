import { ArgumentException } from '../../../Exceptions';



    /**
     * Copies the elements of the source to the array, starting at a particular arrayIndex.
     * @param source The one-dimensional Array that is the source of the elements. The Array must have zero-based indexing.
     * @param array The one-dimensional Array that is the destination of the elements copied from source. The Array must have zero-based indexing.
     * @param arrayIndex The zero-based index in array at which copying begins.
     */
    export default function copyTo<T>(source: T[], array: T[], arrayIndex: number): void
{
    if (source.length > (array.length - arrayIndex))
    {
        throw new ArgumentException("array", "Array is not big enough to store the collection");
    }
    array.splice(arrayIndex, source.length, ...source);
}