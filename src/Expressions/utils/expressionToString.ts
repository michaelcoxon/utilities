import { BinaryExpression } from '../BinaryExpression';
import { ConstantExpression } from '../ConstantExpression';
import { Expression } from '../Expression';
import { ExpressionType } from '../ExpressionType';
import { isUndefinedOrNull } from '../../TypeHelpers';
import getNodeTypeAsString from './getNodeTypeAsString';
import strNotSet from './strNotSet';


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


export function binaryExpressionToString(expression: BinaryExpression): string
{
    if (!isUndefinedOrNull(expression.left) && !isUndefinedOrNull(expression.right))
    {
        return `(${expressionToString(expression.left)} ${getNodeTypeAsString(expression.nodeType)} ${expressionToString(expression.right)})`;
    }
    else if (!isUndefinedOrNull(expression.left))
    {
        return expressionToString(expression.left);
    }

    else
    {
        return `(${strNotSet()} ${getNodeTypeAsString(expression.nodeType)} ${strNotSet()})`;
    }
}
