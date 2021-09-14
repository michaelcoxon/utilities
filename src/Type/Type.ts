import NotImplementedException from '../Exceptions/NotImplementedException';
import isBoolean from '../TypeHelpers/isBoolean';
import isDate from '../TypeHelpers/isDate';
import isFunction from '../TypeHelpers/isFunction';
import isNumber from '../TypeHelpers/isNumber';
import isObject from '../TypeHelpers/isObject';
import isString from '../TypeHelpers/isString';
import isUndefined from '../TypeHelpers/isUndefined';

const typeResolvers: ((subject: unknown) => { success: boolean; type?: IType; })[] = [];

export interface IType
{
    readonly fullName: string;
    readonly name: string;
    readonly namespace: string;
    readonly baseType: IType;
    readonly isArray: boolean;
    factory(...args: unknown[]): unknown;
}

export default class Type
{
    public static get typeResolvers()
    {
        return typeResolvers;
    }

    public static getType(subject: unknown): IType
    {
        return Object.seal((() =>
        {
            if (subject === null)
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
                        return result.type;
                    }
                }
            }

            // last
            else if (isObject(subject))
            {
                return new ObjectType();
            }

            throw new NotImplementedException(`${subject}`);
        })() as IType);
    }
}

class NullType implements IType
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

class UndefinedType implements IType
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

class ArrayType implements IType
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

class NumberType implements IType
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

class BooleanType implements IType
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

class DateType implements IType
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

class StringType implements IType
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

class FunctionType implements IType
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

class ObjectType implements IType
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