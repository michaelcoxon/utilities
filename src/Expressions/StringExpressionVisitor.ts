import StringBuilder from '../IO/StringBuilder.js';
import { BinaryExpression } from './BinaryExpression.js';
import { ConstantExpression } from './ConstantExpression.js';
import { Expression } from './Expression.js';
import { UnaryExpression } from './UnaryExpression.js';
import ExpressionVisitor from './ExpressionVisitor.js';





export default class StringExpressionVisitor extends ExpressionVisitor
{
    #regex = new RegExp("/s+", "ig");
    #sb: StringBuilder;

    simplifyOutput?: boolean;

    /**
     *
     */
    constructor()
    {
        super();
        this.#sb = new StringBuilder();
    }

    get value(): string
    {
        const v = this.#sb.toString().replace(this.#regex, "");
        this.#sb.clear();
        this.#sb.append(v);

        if (!this.simplifyOutput)
        {
            return v;
        }

        return simplify(v);
    }

    public visitAddExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" + ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitAndAlsoExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" && ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitCoalesceExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" ?? ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitDivideExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" / ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitEqualExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" == ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitExclusiveOrExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" ⊕ ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitGreaterThanExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" > ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitGreaterThanOrEqualExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" >= ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitLessThanExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" < ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitLessThanOrEqualExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" <= ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitModuloExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" % ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitMultiplyExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" * ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitNotEqualExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" != ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitOrElseExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" || ");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitPowerExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append("^");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitSubtractExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(" - ");
        this.visit(node.right);
        this.#sb.append(")");
    }

    public visitNegateExpression(node: UnaryExpression): void
    {
        this.#sb.append("(");
        this.#sb.append("-");
        this.visit(node.operand);
        this.#sb.append(")");
    }
    public visitMemberAccessExpression(node: BinaryExpression): void
    {
        this.#sb.append("(");
        this.visit(node.left);
        this.#sb.append(".");
        this.visit(node.right);
        this.#sb.append(")");
    }
    public visitCallExpression(node: Expression): void
    {
        throw new Error('Method not implemented.');
    }
    public visitConstantExpression(node: ConstantExpression): void
    {
        this.#sb.append(`${node.value}`);
    }
}


function simplify(v: string): string
{
    return v;
}

