import { Expression } from './Expression.js';
import { BinaryExpressionType } from './ExpressionType.js';

export interface BinaryExpression extends Expression
{
    nodeType : BinaryExpressionType
    left?: Expression;
    right?: Expression;
}
