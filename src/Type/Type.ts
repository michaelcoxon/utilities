import
{
    isBoolean,
    isDate,
    isFunction,
    isNull,
    isNumber,
    isString,
    isUndefined,
    isObject,
} from '../TypeHelpers';
import { NotImplementedException } from '../Exceptions';

const typeResolvers: ((subject: any) => { success: boolean; type?: Type })[] = [];

export interface Type
{
    readonly fullName: string;
    readonly name: string;
    readonly namespace: string;
    readonly baseType: Type;
    readonly isArray: boolean;
    factory(...args: any[]): any;
}

export class Type
{
    public static get typeResolvers()
    {
        return typeResolvers;
    }

    public static getType(subject: any): Type
    {
        return Object.seal((() =>
        {
            if (isNull(subject))
            {
                return new NullType();
            }
            else if (isUndefined(subject))
            {
                return new UndefinedType();
            }
            else if (isNumber(subject))
            {
                return new NumberType();
            }
            else if (isBoolean(subject))
            {
                return new BooleanType();
            }
            else if (isDate(subject))
            {
                return new DateType();
            }
            else if (isString(subject))
            {
                return new StringType();
            }
            else if (isFunction(subject))
            {
                return new FunctionType();
            }
            else if (Array.isArray(subject))
            {
                return new ArrayType();
            }
            else if (this.typeResolvers.length > 0)
            {
                for (const resolver of this.typeResolvers)
                {
                    const result = resolver(subject);
                    if (result.success)
                    {
                        return result.type!;
                    }
                }
            }

            // last
            else if (isObject(subject))
            {
                return new ObjectType();
            }
            
            throw new NotImplementedException(subject);            
        })());
    }
}

class NullType extends Type implements Type
{
    get fullName()
    {
        return 'Array';
    }
    get name()
    {
        return 'Array';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new NullType();
    }
    get isArray()
    {
        return false;
    }
    factory = () => null;
}

class UndefinedType extends Type implements Type
{
    get fullName()
    {
        return 'undefined';
    }
    get name()
    {
        return 'undefined';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new UndefinedType();
    }
    get isArray()
    {
        return false;
    }
    factory = () => undefined;
}

class ArrayType extends Type implements Type
{
    get fullName()
    {
        return 'Array';
    }
    get name()
    {
        return 'Array';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new ObjectType();
    }
    get isArray()
    {
        return true;
    }
    factory = Array;
}

class NumberType extends Type implements Type
{
    get fullName()
    {
        return 'Number';
    }
    get name()
    {
        return 'Number';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new ObjectType();
    }
    get isArray()
    {
        return false;
    }
    factory = Number;
}

class BooleanType extends Type implements Type
{
    get fullName()
    {
        return 'Boolean';
    }
    get name()
    {
        return 'Boolean';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new ObjectType();
    }
    get isArray()
    {
        return false;
    }
    factory = Boolean;
}

class DateType extends Type implements Type
{
    get fullName()
    {
        return 'Date';
    }
    get name()
    {
        return 'Date';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new ObjectType();
    }
    get isArray()
    {
        return false;
    }
    factory = Date;
}

class StringType extends Type implements Type
{
    get fullName()
    {
        return 'String';
    }
    get name()
    {
        return 'String';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new ObjectType();
    }
    get isArray()
    {
        return false;
    }
    factory = String;
}

class FunctionType extends Type implements Type
{
    get fullName()
    {
        return 'Function';
    }
    get name()
    {
        return 'Function';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new ObjectType();
    }
    get isArray()
    {
        return false;
    }
    factory = Function;
}

class ObjectType extends Type implements Type
{
    get fullName()
    {
        return 'Object';
    }
    get name()
    {
        return 'Object';
    }
    get namespace()
    {
        return '';
    }
    get baseType()
    {
        return new ObjectType();
    }
    get isArray()
    {
        return false;
    }
    factory = Object;
}