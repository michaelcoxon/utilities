import { BinaryExpression } from '../BinaryExpression.js';
import { Expression } from '../Expression.js';
import { ExpressionType } from '../ExpressionType.js';
import createBinaryExpression from './createBinaryExpression.js';

export default function createEqual(left: Expression, right: Expression): BinaryExpression
{
    return createBinaryExpression(ExpressionType.Equal, left, right);
}
