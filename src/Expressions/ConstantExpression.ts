import { Expression } from './Expression';
import { ExpressionType } from './ExpressionType';

export enum ConstantExpressionType
{
    Object = -2,
    Array = -1,
    Null = 0,
    Boolean = 1,
    Number = 2,
    String = 3,
    Date = 4,
}


// type ConstantExpressionTypeMap<T extends ConstantExpressionType> = T extends ConstantExpressionType.Object
//     ? object
//     : T extends ConstantExpressionType.Array
//     ? []
//     : T extends ConstantExpressionType.Null
//     ? undefined
//     : T extends ConstantExpressionType.Boolean
//     ? boolean
//     : T extends ConstantExpressionType.Number
//     ? number
//     : T extends ConstantExpressionType.String
//     ? string
//     : T extends ConstantExpressionType.Date
//     ? Date
//     : never;

export interface ConstantExpression extends Expression
{ 
    value: unknown;
    type: ConstantExpressionType;
}

const NullExpression: ConstantExpression =
{
    type: ConstantExpressionType.Null,
    nodeType: ExpressionType.Constant,
    value: undefined
};

export { NullExpression };