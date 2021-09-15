/**
 * returns true if the two objects are equal but not the same object. (compares the JSON equilient of each object).. should be faster.. should..
 * @param obj1
 * @param obj2
 */

export default function equivilentToByJSON<T>(obj1: T, obj2: T): boolean
{
    return JSON.stringify(obj1) == JSON.stringify(obj2);
}
