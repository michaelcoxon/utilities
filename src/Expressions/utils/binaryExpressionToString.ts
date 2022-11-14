import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull.js';
import { BinaryExpression } from '../BinaryExpression.js';
import expressionToString from './expressionToString.js';
import getNodeTypeAsString from './getNodeTypeAsString.js';
import strNotSet from './strNotSet.js';

export default function binaryExpressionToString(expression: BinaryExpression): string
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
