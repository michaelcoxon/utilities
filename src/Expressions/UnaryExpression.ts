import { Expression } from './Expression.js';

export interface UnaryExpression extends Expression
{
    operand: Expression;
}