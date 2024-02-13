import { BinaryExpression } from './BinaryExpression';
import { ConstantExpression } from './ConstantExpression';
import { UnaryExpression } from './UnaryExpression';
import ExpressionVisitor from './ExpressionVisitor';
import { Instruction } from './Instruction';





export default class InstructionExpressionVisitor extends ExpressionVisitor
{
    #stack: unknown[] = [];

    get value(): Instruction
    {
        return this.#stack as Instruction;
    }

    public visitAddExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitAndAlsoExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitCoalesceExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitDivideExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitEqualExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitExclusiveOrExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitGreaterThanExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitGreaterThanOrEqualExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitLessThanExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitLessThanOrEqualExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitModuloExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitMultiplyExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitNotEqualExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitOrElseExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitPowerExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitSubtractExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }

    public visitNegateExpression(node: UnaryExpression): void
    {
        const operandVisitor = new InstructionExpressionVisitor();
        operandVisitor.visit(node.operand);
        this.#stack.push(...[node.nodeType, operandVisitor.value]);
    }
    public visitMemberAccessExpression(node: BinaryExpression): void
    {
        this.#stack.push(...visitBinaryExpression(node));
    }
    public visitCallExpression(/*node: Expression*/): void
    {
        throw new Error('Method not implemented.');
    }
    public visitConstantExpression(node: ConstantExpression): void
    {
        this.#stack.push(...[node.nodeType, node.value]);
    }
}


// function simplify(v: string): string
// {
//     return v;
// }

function visitBinaryExpression(node: BinaryExpression): unknown[]
{
    const leftVisitor = new InstructionExpressionVisitor();
    const rightVisitor = new InstructionExpressionVisitor();

    leftVisitor.visit(node.left);
    rightVisitor.visit(node.right);

    return [node.nodeType, leftVisitor.value, rightVisitor.value];
}