import { BinaryExpression } from '../BinaryExpression';
import expressionToString from './expressionToString';
import getNodeTypeAsString from './getNodeTypeAsString';
import strNotSet from './strNotSet';

export default function binaryExpressionToString(expression: BinaryExpression): string
{
    if (expression.left && expression.right)
    {
        return `(${expressionToString(expression.left)} ${getNodeTypeAsString(expression.nodeType)} ${expressionToString(expression.right)})`;
    }
    else if (expression.left)
    {
        return expressionToString(expression.left);
    }

    else
    {
        return `(${strNotSet()} ${getNodeTypeAsString(expression.nodeType)} ${strNotSet()})`;
    }
}
