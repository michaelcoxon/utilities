import { BinaryExpression } from '../BinaryExpression.js';
import { Expression } from '../Expression.js';
import { ExpressionType } from '../ExpressionType.js';
import createBinaryExpression from './createBinaryExpression.js';

export default function createOrElse(left: Expression, right: Expression): BinaryExpression
{
    return createBinaryExpression(ExpressionType.OrElse, left, right);
}
