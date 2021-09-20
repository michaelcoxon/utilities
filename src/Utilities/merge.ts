
//type SummedTypes;
// source: https://stackoverflow.com/questions/49682569/typescript-merge-object-types/49683575#49683575

type OptionalPropertyNames<T> =
  { [K in keyof T]-?: ({} extends { [P in K]: T[K] } ? K : never) }[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> =
  { [P in K]: L[P] | Exclude<R[P], undefined> };

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type SpreadTwo<L, R> = Id<
  & Pick<L, Exclude<keyof L, keyof R>>
  & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>>
  & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>>
  & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R] ?
  SpreadTwo<L, Spread<R>> : unknown

// source: https://attacomsian.com/blog/javascript-merge-objects#deep-merge-objects
function merge<A extends object[]>(...a: [...A]) 
{
    // create a new object
    let target = {};

    // iterate through all objects and 
    // deep merge them with target
    for (let i = 0; i < a.length; i++)
    {
        // deep merge the object into the target object
        merger(a[i], target);
    }

    return target as Spread<A>;
};

export default merge;

// deep merge the object into the target object
function merger(obj, target: Record<string, any>): void
{
    for (let prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        {
            if (Object.prototype.toString.call(obj[prop]) === '[object Object]')
            {
                // if the property is a nested object
                target[prop] = merge(target[prop], obj[prop]);
            } else
            {
                // for regular property
                target[prop] = obj[prop];
            }
        }
    }
};