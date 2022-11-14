import isObject from '../TypeHelpers/isObject.js';
import equivilentToByJSON from './equivilentToByJSON.js';

/**
 * returns true if the two objects are equal but not the same object. (compares public keys)
 * @param obj1
 * @param obj2
 */
export default function equals<T>(obj1: T, obj2: T): boolean;
/**
 * returns true if the two objects are equal but not the same object. (compares public keys)
 * @param obj1
 * @param obj2
 * @param forceJSON converts the objects to JSON and compares the two strings.
 */
export default function equals<T>(obj1: T, obj2: T, forceJSON: boolean): boolean;
/**
 * returns true if the two objects are equal but not the same object. (compares public keys)
 * @param obj1
 * @param obj2
 * @param forceJSON converts the objects to JSON and compares the two strings.
 * @param deep Does a deep compare. forceJSON must be false
 */
export default function equals<T>(obj1: T, obj2: T, forceJSON: boolean, deep: boolean): boolean;
export default function equals<T>(obj1: T, obj2: T, forceJSON = false, deep = false): boolean
{
    let state = false;

    if (isObject(obj1))
    {
        if (!forceJSON)
        {
            for (const key in Object.getOwnPropertyNames(obj1))
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