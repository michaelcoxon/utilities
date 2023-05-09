import { BinaryExpression } from './BinaryExpression';
import { ConstantExpression, ConstantExpressionType } from './ConstantExpression';
import { Expression } from './Expression';
import { ExpressionType } from './ExpressionType';
import StringExpressionVisitor from './StringExpressionVisitor';


describe("StringExpressionVisitor.constructor", () =>
{
    it("should construct", () =>
    {
        new StringExpressionVisitor();
    });
});


describe("StringExpressionVisitor.visitAddExpression", () =>
{
    it("should simple visitAddExpression", () =>
    {
        const service = new StringExpressionVisitor();
        const subject: BinaryExpression = {
            nodeType: ExpressionType.Add,
            left: {
                nodeType: ExpressionType.Constant,
                type: ConstantExpressionType.Number,
                value: 4
            } as ConstantExpression,
            right: {
                nodeType: ExpressionType.Constant,
                type: ConstantExpressionType.Number,
                value: 3
            } as ConstantExpression
        };
        const expected = "(4 + 3)";

        service.visit(subject);

        const actual = service.value;

        expect(actual).toEqual(expected);
    });

    it("should complex visitAddExpression", () =>
    {
        const service = new StringExpressionVisitor();
        const subject: BinaryExpression = {
            nodeType: ExpressionType.Add,
            left: {
                nodeType: ExpressionType.Add,
                left: {
                    nodeType: ExpressionType.Constant,
                    type: ConstantExpressionType.Number,
                    value: 30
                } as ConstantExpression,
                right: {
                    nodeType: ExpressionType.Add,
                    left: {
                        nodeType: ExpressionType.Add,
                        left: {
                            nodeType: ExpressionType.Constant,
                            type: ConstantExpressionType.Number,
                            value: 10
                        } as ConstantExpression,
                        right: {
                            nodeType: ExpressionType.Constant,
                            type: ConstantExpressionType.Number,
                            value: 11
                        } as ConstantExpression
                    } as BinaryExpression,
                    right: {
                        nodeType: ExpressionType.Constant,
                        type: ConstantExpressionType.Number,
                        value: 21
                    } as ConstantExpression
                } as BinaryExpression
            } as BinaryExpression,
            right: {
                nodeType: ExpressionType.Constant,
                type: ConstantExpressionType.Number,
                value: 41
            } as ConstantExpression
        };
        
        const expected = "((30 + ((10 + 11) + 21)) + 41)";

        service.visit(subject);

        const actual = service.value;

        expect(actual).toEqual(expected);
    });
});