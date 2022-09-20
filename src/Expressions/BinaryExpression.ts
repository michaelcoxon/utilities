import { Expression } from './Expression';
import { ExpressionType } from './ExpressionType';

export interface BinaryExpression extends Expression
{
    nodeType : BinaryExpressionType
    left: Expression;
    right: Expression;
}

export type BinaryExpressionType = ExpressionType.Add
    | ExpressionType.AndAlso
    | ExpressionType.Coalesce
    | ExpressionType.Divide
    | ExpressionType.Equal
    | ExpressionType.ExclusiveOr
    | ExpressionType.GreaterThan
    | ExpressionType.GreaterThanOrEqual
    | ExpressionType.LessThan
    | ExpressionType.LessThanOrEqual
    | ExpressionType.Modulo
    | ExpressionType.Multiply
    | ExpressionType.NotEqual
    | ExpressionType.OrElse
    | ExpressionType.Power
    | ExpressionType.Subtract
    ;