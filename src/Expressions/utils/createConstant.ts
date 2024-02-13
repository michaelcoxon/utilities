import { ConstantExpressionType, ConstantExpression } from '../ConstantExpression';
import { ExpressionType } from '../ExpressionType';

export default function createConstant(value: unknown, type: ConstantExpressionType): ConstantExpression
{
    return {
        nodeType: ExpressionType.Constant,
        value,
        type,
    };
}
