import Strings from './Strings';
import { isUndefinedOrNull } from './TypeHelpers';
import { QueryStringItem } from './Url';

/** Helper for dealing with query strings */


namespace QueryStringHelper
{
    /**
     * Deserializes a query string into an array of {@link QueryStringItem}'s
     * @param queryString The query string to deserialize
     * @returns {QueryStringItem[]} A collections of the items in the query string.
     */
    export function deserialize(queryString: string): QueryStringItem[]
    {
        let query = queryString;
        if (query.startsWith('?'))
        {
            query = query.substr(1);
        }

        const segments = query.split("&");
        return segments
            .map(s =>
            {
                var components = s.split('=', 2);
                return {
                    name: components[0],
                    value: parseValue(decodeURIComponent(components[1]))
                };
            });
    }

    /**
     * Serializes an {@link Object} to a query string without a prepended question mark
     * @param obj the {@link Object} to serialize
     */
    export function serialize(obj: {}): string;
    /**
     * Serializes an {@link Object} to a query string. Will prepend a question mark if {@param useQuestionMark} is true
     * @param obj the {@link Object} to serialize
     */
    export function serialize(obj: {}, useQuestionMark: boolean): string;
    export function serialize(obj: {}, useQuestionMark: boolean = false): string
    {
        return serializeQueryStringItems(convertObject(obj), useQuestionMark);
    }

    /**
     * Serializes a collection of {@link QueryStringItem}'s to a query string without a prepended question mark
     * @param queryStringItems
     */
    export function serializeQueryStringItems(queryStringItems: QueryStringItem[]): string;
    /**
     * Serializes a collection of {@link QueryStringItem}'s to a query string. Will prepend a question mark if {@param useQuestionMark} is true
     * @param queryStringItems
     */
    export function serializeQueryStringItems(queryStringItems: QueryStringItem[], useQuestionMark: boolean): string;
    export function serializeQueryStringItems(queryStringItems: QueryStringItem[], useQuestionMark: boolean = false): string
    {
        if (queryStringItems.length == 0)
        {
            useQuestionMark = false;
        }

        return (useQuestionMark ? '?' : Strings.empty) + queryStringItems
            .map(kvp => `${kvp.name}=${encodeURIComponent(kvp.value)}`)
            .join("&");;
    }

    /**
     * Converts a collection of {@link QueryStringItem}'s to an object
     * @param queryStringItems
     */
    export function convertToObject(queryStringItems: QueryStringItem[]): { [key: string]: any; }
    {
        const result: { [key: string]: any; } = {};

        for (const item of queryStringItems)
        {
            buildObjectTree(result, item.name, item.value);
        }

        return result;
    }

    /**
     * Converts and {@link Object} to a collection of {@link QueryStringItem}'s.
     * @param obj
     */
    export function convertObject(obj: {}): QueryStringItem[];
    /**
     * Converts and {@link Object} to a collection of {@link QueryStringItem}'s with the specified {@param prefix} for the key.
     * @param obj
     */
    export function convertObject(obj: {}, prefix: string): QueryStringItem[];
    export function convertObject(obj: {}, prefix: string = Strings.empty): QueryStringItem[]
    {
        const result: QueryStringItem[] = [];

        for (const key in obj)
        {
            if (!isUndefinedOrNull(obj[key]))
            {
                result.push(...convert(`${prefix}${key}`, obj[key]));
            }
        }

        return result;
    }

    function convertArray(name: string, arr: any[]): QueryStringItem[]
    {
        const result: QueryStringItem[] = [];

        for (let i = 0; i < arr.length; i++)
        {
            const item = arr[i];

            result.push(...convert(`${name}[${i}]`, item));
        }

        return result;
    }

    function convert(name: string, value: any): QueryStringItem[]
    {
        const result: QueryStringItem[] = [];

        if (!isUndefinedOrNull(value))
        {
            if (Array.isArray(value))
            {
                result.push(...convertArray(`${name}`, value));
            }
            else if (typeof value === 'object')
            {
                result.push(...convertObject(value, `${name}.`));
            }

            else
            {
                result.push({
                    name: name,
                    value: value
                });
            }
        }

        return result;
    }

    function parseValue(value: string): any
    {
        //
        // null or empty
        //
        if (Strings.isNullOrEmpty(value))
        {
            return value;
        }

        value = Strings.trim(value);

        //
        // booleans
        //
        if (value.toLowerCase() === 'true')
        {
            return true;
        }
        else if (value.toLowerCase() === 'false')
        {
            return false;
        }



        // 
        // integer
        //
        else if (/^\d+$/.test(value))
        {
            return parseInt(value);
        }



        // 
        // float
        //
        else if (/^\d+.\d+$/.test(value))
        {
            return parseFloat(value);
        }




        // 
        // string
        //
        else
        {
            return value;
        }
    }

    function buildObjectTree(result: { [key: string]: any; }, name: string, value: any): void
    {
        const keys = name.split('.');
        let current = result;

        for (let i = 0; i < keys.length; i++)
        {
            const currentKey = keys[i];

            if (currentKey.endsWith(']'))
            {
                // array
                const actualKey = currentKey.substring(0, currentKey.indexOf('['));
                current[actualKey] = current[actualKey] || [];

                let index = parseInt(currentKey.split('[', 2)[1]);

                if (isNaN(index))
                {
                    index = current[actualKey].length;
                }

                current = current[actualKey][index] = isUndefinedOrNull(current[actualKey][index])
                    ? (i < keys.length - 1 ? {} : value)
                    : current[actualKey][index];
            }

            else
            {
                // object
                current = current[currentKey] = isUndefinedOrNull(current[currentKey])
                    ? (i < keys.length - 1 ? {} : value)
                    : current[currentKey];
            }
        }
    }
}
export default QueryStringHelper;

