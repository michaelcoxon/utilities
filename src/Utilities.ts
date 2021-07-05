import Strings from './Strings';
import { isDate, isNumber } from './TypeHelpers';
import NumberFormatter from './Formatters/NumberFormatter';
import DateFormatter from './Formatters/DateFormatter';
import StringFormatter from './Formatters/StringFormatter';
const KEYVALUESEPARATOR = ":";

namespace Utilities
{
    export const noop = (...args: any[]) => { };

    export function convertToString(subject: any, format: string = Strings.empty): string
    {
        if (isNumber(subject))
        {
            return new NumberFormatter().format(subject, format);
        }
        if (isDate(subject))
        {
            return new DateFormatter().format(subject, format);
        }

        // default and string
        return new StringFormatter().format(subject.toString(), format);
    }

    /**
     * returns true if the two objects are equal but not the same object. (compares public keys)
     * @param obj1
     * @param obj2
     */
    export function equals<T>(obj1: T, obj2: T): boolean;
    /**
     * returns true if the two objects are equal but not the same object. (compares public keys)
     * @param obj1
     * @param obj2
     * @param forceJSON converts the objects to JSON and compares the two strings.
     */
    export function equals<T>(obj1: T, obj2: T, forceJSON: boolean): boolean;
    /**
     * returns true if the two objects are equal but not the same object. (compares public keys)
     * @param obj1
     * @param obj2
     * @param forceJSON converts the objects to JSON and compares the two strings.
     * @param deep Does a deep compare. forceJSON must be false
     */
    export function equals<T>(obj1: T, obj2: T, forceJSON: boolean, deep: boolean): boolean;
    export function equals<T>(obj1: T, obj2: T, forceJSON: boolean = false, deep: boolean = false): boolean
    {
        let state = false;

        if (typeof obj1 === 'object')
        {
            if (!forceJSON)
            {
                for (let key in obj1)
                {
                    if ((obj1 as Object).hasOwnProperty(key))
                    {
                        if (deep)
                        {
                            state = equals(obj1[key], obj2[key], forceJSON, deep);
                        }
                        else
                        {
                            state = obj1[key] == obj2[key];
                        }

                        if (!state)
                        {
                            break;
                        }
                    }
                }
            }
            else
            {
                state = equivilentToByJSON(obj1, obj2);
            }
        }
        else
        {
            state = forceJSON
                ? equivilentToByJSON(obj1, obj2)
                : obj1 === obj2;
        }

        return state;
    }

    /**
     * returns true if the two objects are equal but not the same object. (compares the JSON equilient of each object).. should be faster.. should..
     * @param obj1
     * @param obj2
     */
    export function equivilentToByJSON<T>(obj1: T, obj2: T): boolean
    {
        return JSON.stringify(obj1) == JSON.stringify(obj2);
    }

    /**
     * returns a hash of the object
     * @param o
     */
    export function getHash(o: any): string
    {
        let hash: string = Strings.empty;

        if (!!JSON && !!JSON.stringify)
        {
            for (let key in o)
            {
                if (o.hasOwnProperty(key))
                {
                    hash += `${key}${KEYVALUESEPARATOR}${o[key]}`;
                }
            }
        }
        else
        {
            hash = JSON.stringify(o);
        }

        return hashString(hash).toString();
    }

    /**
     * Returns the type of the object as a string
     * @param o
     */
    export function getType(o: any): string
    {
        // null
        if (o === null)
        {
            return 'null';
        }

        // jquery
        if (o.fn !== undefined && o.fn.jquery !== undefined)
        {
            return 'jQuery';
        }

        // value types
        if (typeof (o) != 'object')
        {
            return typeof (o);
        }

        // MicrosoftAjax
        if (o.constructor.getName && o.constructor.getName() != null)
        {
            return o.constructor.getName();
        }

        // constructor method name
        if (o.constructor.name === undefined)
        {
            var name = o.constructor.toString().match(/^[\n\r\s]*function\s*([^\s(]+)/)[1]
            if (!Strings.isNullOrEmpty(name))
            {
                return name;
            }
        }
        else if (!Strings.isNullOrEmpty(o.constructor.name))
        {
            return o.constructor.name;
        }

        // fallback
        return typeof o;
    }
}

export default Utilities;

function hashString(str: string): number
{
    if (str.length === 0)
    {
        return 0;
    }
    else if (Array.prototype.reduce === undefined)
    {
        var hash = 0, i, chr;
        for (i = 0; i < str.length; i++)
        {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    else
    {
        return str.split(Strings.empty)
            .map(chr => chr.charCodeAt(0))
            .reduce((hash, chr) => (((hash << 5) - hash) + chr) | 0);
    }
};