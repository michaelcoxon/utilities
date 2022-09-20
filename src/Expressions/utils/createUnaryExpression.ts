import { BinaryExpression } from '../BinaryExpression';
import { Expression } from '../Expression';
import { ExpressionType } from '../ExpressionType';
import { UnaryExpression } from '../UnaryExpression';

export default function createUnaryExpression(nodeType: ExpressionType, operand: Expression): UnaryExpression
{
    return { nodeType, operand };
}
