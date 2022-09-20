import { BinaryExpression } from '../BinaryExpression';
import { Expression } from '../Expression';
import { ExpressionType } from '../ExpressionType';
import createBinaryExpression from './createBinaryExpression';

export default function createAdd(left: Expression, right: Expression): BinaryExpression
{
    return createBinaryExpression(ExpressionType.Add, left, right);
}
