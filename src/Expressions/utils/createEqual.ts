import { BinaryExpression } from '../BinaryExpression';
import { Expression } from '../Expression';
import { ExpressionType } from '../ExpressionType';
import createBinaryExpression from './createBinaryExpression';

export default function createEqual(left: Expression, right: Expression): BinaryExpression
{
    return createBinaryExpression(ExpressionType.Equal, left, right);
}
