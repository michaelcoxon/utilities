import { NotImplementedException } from '../Exceptions';
import { isUndefinedOrNull } from '../TypeHelpers';
import { BinaryExpression } from './BinaryExpression';
import { ConstantExpression } from './ConstantExpression';
import { Expression } from './Expression';
import { ExpressionType } from './ExpressionType';
import { UnaryExpression } from './UnaryExpression';


export default abstract class ExpressionVisitor
{
    public visit(node?: Expression): void
    {
        if (isUndefinedOrNull(node))
        {
            return;
        }

        switch (node.nodeType)
        {
            case ExpressionType.Add: return this.visitAddExpression(node as BinaryExpression);
            case ExpressionType.AndAlso: return this.visitAndAlsoExpression(node as BinaryExpression);
            case ExpressionType.Call: return this.visitCallExpression(node);
            case ExpressionType.Coalesce: return this.visitCoalesceExpression(node as BinaryExpression);
            case ExpressionType.Constant: return this.visitConstantExpression(node as ConstantExpression);
            case ExpressionType.Divide: return this.visitDivideExpression(node as BinaryExpression);
            case ExpressionType.Equal: return this.visitEqualExpression(node as BinaryExpression);
            case ExpressionType.ExclusiveOr: return this.visitExclusiveOrExpression(node as BinaryExpression);
            case ExpressionType.GreaterThan: return this.visitGreaterThanExpression(node as BinaryExpression);
            case ExpressionType.GreaterThanOrEqual: return this.visitGreaterThanOrEqualExpression(node as BinaryExpression);
            case ExpressionType.LessThan: return this.visitLessThanExpression(node as BinaryExpression);
            case ExpressionType.LessThanOrEqual: return this.visitLessThanOrEqualExpression(node as BinaryExpression);
            case ExpressionType.MemberAccess: return this.visitMemberAccessExpression(node as BinaryExpression);
            case ExpressionType.Modulo: return this.visitModuloExpression(node as BinaryExpression);
            case ExpressionType.Multiply: return this.visitMultiplyExpression(node as BinaryExpression);
            case ExpressionType.NotEqual: return this.visitNotEqualExpression(node as BinaryExpression);
            case ExpressionType.Negate: return this.visitNegateExpression(node as UnaryExpression);
            case ExpressionType.OrElse: return this.visitOrElseExpression(node as BinaryExpression);
            case ExpressionType.Power: return this.visitPowerExpression(node as BinaryExpression);
            case ExpressionType.Subtract: return this.visitSubtractExpression(node as BinaryExpression);
            default: throw new NotImplementedException(`Node type '${node.nodeType}' is not implemented.`);
        }
    }
    
    public abstract visitNegateExpression(node: UnaryExpression): void;
    public abstract visitMemberAccessExpression(node: BinaryExpression): void;
    public abstract visitCallExpression(node: Expression): void;
    public abstract visitConstantExpression(node: ConstantExpression): void;
    public abstract visitAddExpression(node: BinaryExpression): void;
    public abstract visitAndAlsoExpression(node: BinaryExpression): void;
    public abstract visitCoalesceExpression(node: BinaryExpression): void;
    public abstract visitDivideExpression(node: BinaryExpression): void;
    public abstract visitEqualExpression(node: BinaryExpression): void;
    public abstract visitExclusiveOrExpression(node: BinaryExpression): void;
    public abstract visitGreaterThanExpression(node: BinaryExpression): void;
    public abstract visitGreaterThanOrEqualExpression(node: BinaryExpression): void;
    public abstract visitLessThanExpression(node: BinaryExpression): void;
    public abstract visitLessThanOrEqualExpression(node: BinaryExpression): void;
    public abstract visitModuloExpression(node: BinaryExpression): void;
    public abstract visitMultiplyExpression(node: BinaryExpression): void;
    public abstract visitNotEqualExpression(node: BinaryExpression): void;
    public abstract visitOrElseExpression(node: BinaryExpression): void;
    public abstract visitPowerExpression(node: BinaryExpression): void;
    public abstract visitSubtractExpression(node: BinaryExpression): void;
}




