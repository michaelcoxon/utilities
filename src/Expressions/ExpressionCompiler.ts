import { NotSupportedException } from '../Exceptions';
import { isUndefinedOrNull } from '../TypeHelpers';
import { BinaryExpression } from './BinaryExpression';
import { ConstantExpression, ConstantExpressionType } from './ConstantExpression';
import { Expression } from './Expression';
import { ExpressionType } from './ExpressionType';






export default class ExpressionCompiler
{

}

function getValue(expression?: Expression)
{
    switch (expression?.nodeType)
    {
        case ExpressionType.Add:
            {
                const expr = expression as BinaryExpression;
                return add(expr.left, expr.right);
            }
        case ExpressionType.AndAlso:
            {
                const expr = expression as BinaryExpression;
                return andAlso(expr.left, expr.right);
            }
        case ExpressionType.Constant:
            {
                const expr = expression as ConstantExpression;
                return constant(expr);
            }
        default:
            {
                if (!isUndefinedOrNull(expression))
                {
                    throw new NotSupportedException(`expression '${JSON.stringify(expression)}' is not supported`);
                }
            }
    }
}

function add(left?: Expression, right?: Expression)
{
    return getValue(left) + getValue(right);
}

function andAlso(left?: Expression, right?: Expression)
{
    return getValue(left) && getValue(right);
}

function constant(expression: ConstantExpression)
{
    switch (expression.type)
    {
        case ConstantExpressionType.Number:
        case ConstantExpressionType.Array:
        case ConstantExpressionType.Boolean:
        case ConstantExpressionType.Date:
        case ConstantExpressionType.Null:
        case ConstantExpressionType.Object:
        case ConstantExpressionType.String:
        default:
            return expression.value;
    }
}

