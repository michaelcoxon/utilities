import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';




export default function buildObjectTree(result: Record<string, any>, name: string, value: any): void
{
    const keys = name.split('.');
    let current: any = result;

    for (let i = 0; i < keys.length; i++)
    {
        const currentKey = keys[i];

        if (currentKey.endsWith(']'))
        {
            // array
            const actualKey = currentKey.substring(0, currentKey.indexOf('['));
            const array: any[] = isUndefinedOrNull(current[actualKey]) ? [] : current[actualKey] as any[];
            current[actualKey] = array;

            let index = parseInt(currentKey.split('[', 2)[1]);

            if (isNaN(index))
            {
                index = array.length;
            }

            current = array[index] = isUndefinedOrNull(array[index])
                ? (i < keys.length - 1 ? {} : value)
                : array[index];
        }
        else
        {
            // object
            current[currentKey] = isUndefinedOrNull(current[currentKey])
                ? (i < keys.length - 1 ? {} : value)
                : current[currentKey];

            current = current[currentKey] as Record<string, any>;
        }
    }
}
