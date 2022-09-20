import { Expression } from './Expression';

export interface UnaryExpression extends Expression
{
    operand: Expression;
}