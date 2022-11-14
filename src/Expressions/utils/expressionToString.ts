import { BinaryExpression } from '../BinaryExpression.js';
import { ConstantExpression } from '../ConstantExpression.js';
import { Expression } from '../Expression.js';
import { ExpressionType } from '../ExpressionType.js';
import binaryExpressionToString from './binaryExpressionToString.js';

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
