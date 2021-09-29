/** Serializes an error to JSON. 
 *  @param error The error to serialize.
*/
export default function serializeError(error: Error): string
{
    return JSON.stringify(Object.assign({}, error));
}
