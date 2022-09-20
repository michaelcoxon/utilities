import { BinaryExpression } from '../BinaryExpression';
import { Expression } from '../Expression';
import { ExpressionType } from '../ExpressionType';
import createBinaryExpression from './createBinaryExpression';

export default function createOrElse(left: Expression, right: Expression): BinaryExpression
{
    return createBinaryExpression(ExpressionType.OrElse, left, right);
}
