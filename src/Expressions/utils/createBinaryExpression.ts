import { BinaryExpression } from '../BinaryExpression.js';
import { Expression } from '../Expression.js';
import { BinaryExpressionType } from '../ExpressionType.js';

export default function createBinaryExpression(nodeType: BinaryExpressionType, left: Expression, right: Expression): BinaryExpression
{
    return { nodeType, left, right };
}
