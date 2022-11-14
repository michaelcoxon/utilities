import { BinaryExpression } from '../BinaryExpression.js';
import { Expression } from '../Expression.js';
import { ExpressionType } from '../ExpressionType.js';
import { UnaryExpression } from '../UnaryExpression.js';

export default function createUnaryExpression(nodeType: ExpressionType, operand: Expression): UnaryExpression
{
    return { nodeType, operand };
}
