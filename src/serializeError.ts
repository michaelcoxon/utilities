
export default function serializeError(error: Error): string
{
    return JSON.stringify(Object.assign({}, error));
}
