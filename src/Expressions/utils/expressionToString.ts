import { BinaryExpression } from '../BinaryExpression';
import { ConstantExpression } from '../ConstantExpression';
import { Expression } from '../Expression';
import { ExpressionType } from '../ExpressionType';
import binaryExpressionToString from './binaryExpressionToString';

export default function expressionToString(expression: Expression): string
{
    switch (expression.nodeType)
    {
        case ExpressionType.AndAlso:
        case ExpressionType.OrElse:
        case ExpressionType.Equal:
        case ExpressionType.NotEqual: return binaryExpressionToString(expression as BinaryExpression);
        case ExpressionType.Constant: return `${(expression as ConstantExpression).value}`;

        default:
            throw Error("Not supported");
    }
}
