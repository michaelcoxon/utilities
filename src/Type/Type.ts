import NotImplementedException from '../Exceptions/NotImplementedException.js';
import isBoolean from '../TypeHelpers/isBoolean.js';
import isDate from '../TypeHelpers/isDate.js';
import isFunction from '../TypeHelpers/isFunction.js';
import isNumber from '../TypeHelpers/isNumber.js';
import isObject from '../TypeHelpers/isObject.js';
import isString from '../TypeHelpers/isString.js';
import isUndefined from '../TypeHelpers/isUndefined.js';
import ArrayType from './ArrayType.js';
import BooleanType from './BooleanType.js';
import DateType from './DateType.js';
import FunctionType from './FunctionType.js';
import { IType } from './_types.js';
import NullType from './NullType.js';
import NumberType from './NumberType.js';
import ObjectType from './ObjectType.js';
import StringType from './StringType.js';
import UndefinedType from './UndefinedType.js';

const typeResolvers: ((subject: any) => { success: boolean; type?: IType; })[] = [];

export default class Type
{
    public static get typeResolvers()
    {
        return typeResolvers;
    }

    public static getType(subject: any): IType
    {
        return Object.seal((() =>
        {
            if (subject === null)
            {
                return NullType;
            }
            else if (isUndefined(subject))
            {
                return UndefinedType;
            }
            else if (isNumber(subject))
            {
                return NumberType;
            }
            else if (isBoolean(subject))
            {
                return BooleanType;
            }
            else if (isDate(subject))
            {
                return DateType;
            }
            else if (isString(subject))
            {
                return StringType;
            }
            else if (isFunction(subject))
            {
                return FunctionType;
            }
            else if (Array.isArray(subject))
            {
                return ArrayType;
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
                return ObjectType;
            }

            throw new NotImplementedException(`${subject}`);
        })() as IType);
    }
}