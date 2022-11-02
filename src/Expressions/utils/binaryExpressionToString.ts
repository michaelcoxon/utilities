import { isUndefinedOrNull } from '../../TypeHelpers';
import { BinaryExpression } from '../BinaryExpression';
import expressionToString from './expressionToString';
import getNodeTypeAsString from './getNodeTypeAsString';
import strNotSet from './strNotSet';

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
