/**
 * Returns the type of the object as a string
 * @param o
 */

import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty';

export default function getType(o: unknown): string
{
    // null
    if (o === null)
    {
        return 'null';
    }

    else if (o === undefined)
    {
        return 'undefined';
    }

    // jquery
    else if (o['fn'] !== undefined && o['fn'].jquery !== undefined)
    {
        return 'jQuery';
    }

    // value types
    else if (typeof (o) != 'object')
    {
        return typeof (o);
    }

    // MicrosoftAjax
    else if (o.constructor['getName'] && o.constructor['getName']() != null)
    {
        return o.constructor['getName']();
    }

    // constructor method name
    else if (o.constructor.name === undefined)
    {
        const matches = `${o.constructor}`.match(/^[\n\r\s]*function\s*([^\s(]+)/);
        const name = matches && matches[1];
        if (!isNullOrEmpty(name))
        {
            return name;
        }
    }
    else if (!isNullOrEmpty(o?.constructor?.name))
    {
        return o.constructor.name;
    }

    // fallback
    return typeof o;
}
