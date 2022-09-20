import { BinaryExpression, BinaryExpressionType } from '../BinaryExpression';
import { Expression } from '../Expression';
import { ExpressionType } from '../ExpressionType';

export default function createBinaryExpression(nodeType: BinaryExpressionType, left: Expression, right: Expression): BinaryExpression
{
    return { nodeType, left, right };
}
