import { NotSupportedException } from '../../Exceptions';
import { ExpressionType } from '../ExpressionType';

export default function getNodeTypeAsString(nodeType: ExpressionType): string
{
    switch (nodeType)
    {
        case ExpressionType.AndAlso: return "&&";
        case ExpressionType.OrElse: return "||";
        case ExpressionType.Equal: return "==";
        case ExpressionType.NotEqual: return "!=";
        default: throw new NotSupportedException(`Expression type ${nodeType} [${ExpressionType[nodeType]}] is not supported.`);
    }
}
