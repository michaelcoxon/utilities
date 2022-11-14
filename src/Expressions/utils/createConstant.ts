import { ConstantExpressionType, ConstantExpression } from '../ConstantExpression.js';
import { ExpressionType } from '../ExpressionType.js';

export default function createConstant(value: any, type: ConstantExpressionType): ConstantExpression
{
    return {
        nodeType: ExpressionType.Constant,
        value,
        type,
    };
}
