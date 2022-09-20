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

export interface ConstantExpression extends Expression
{
    value: any;
    type: ConstantExpressionType;
}

const NullExpression: ConstantExpression =
{
    type: ConstantExpressionType.Null,
    nodeType: ExpressionType.Constant,
    value: undefined
};

export { NullExpression };