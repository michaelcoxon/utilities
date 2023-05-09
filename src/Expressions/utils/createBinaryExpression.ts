import { BinaryExpression } from '../BinaryExpression';
import { Expression } from '../Expression';
import { BinaryExpressionType } from '../ExpressionType';

export default function createBinaryExpression(nodeType: BinaryExpressionType, left: Expression, right: Expression): BinaryExpression
{
    return { nodeType, left, right };
}
