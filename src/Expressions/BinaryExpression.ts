import { Expression } from './Expression';
import { BinaryExpressionType } from './ExpressionType';

export interface BinaryExpression extends Expression
{
    nodeType : BinaryExpressionType
    left?: Expression;
    right?: Expression;
}
