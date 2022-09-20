import { BinaryExpression } from '../BinaryExpression';
import { Expression } from '../Expression';
import { ExpressionType } from '../ExpressionType';
import createBinaryExpression from './createBinaryExpression';

export default function createAndAlso(left: Expression, right: Expression): BinaryExpression
{
    return createBinaryExpression(ExpressionType.AndAlso, left, right);
}
