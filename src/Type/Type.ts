import NotImplementedException from '../Exceptions/NotImplementedException';
import isBoolean from '../TypeHelpers/isBoolean';
import isDate from '../TypeHelpers/isDate';
import isFunction from '../TypeHelpers/isFunction';
import isNumber from '../TypeHelpers/isNumber';
import isObject from '../TypeHelpers/isObject';
import isString from '../TypeHelpers/isString';
import isUndefined from '../TypeHelpers/isUndefined';
import ArrayType from './ArrayType';
import BooleanType from './BooleanType';
import DateType from './DateType';
import FunctionType from './FunctionType';
import { IType } from './_types';
import NullType from './NullType';
import NumberType from './NumberType';
import ObjectType from './ObjectType';
import StringType from './StringType';
import UndefinedType from './UndefinedType';

const typeResolvers: ((subject: unknown) => { success: boolean; type?: IType; })[] = [];

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