import { BinaryExpression } from './BinaryExpression.js';
import { ConstantExpression, ConstantExpressionType } from './ConstantExpression.js';
import { ExpressionType } from './ExpressionType.js';
import InstructionExpressionVisitor from './InstructionExpressionVisitor.js';


describe("InstructionExpressionVisitor.constructor", () =>
{
    it("should construct", () =>
    {
        new InstructionExpressionVisitor();
    });
});


describe("InstructionExpressionVisitor.visitAddExpression", () =>
{
    it("should simple visitAddExpression", () =>
    {
        const service = new InstructionExpressionVisitor();
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
        const expected = [
            ExpressionType.Add,
            [ExpressionType.Constant, 4],
            [ExpressionType.Constant, 3]
        ];

        service.visit(subject);

        const actual = service.value;

        expect(actual).toEqual(expected);
    });

    it("should complex visitAddExpression", () =>
    {
        const service = new InstructionExpressionVisitor();
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

        const expected = [
            ExpressionType.Add, [
                ExpressionType.Add,
                [ExpressionType.Constant, 30], [
                    ExpressionType.Add, [
                        ExpressionType.Add,
                        [ExpressionType.Constant, 10],
                        [ExpressionType.Constant, 11]
                    ],
                    [ExpressionType.Constant, 21]
                ]
            ],
            [ExpressionType.Constant, 41]
        ];

        service.visit(subject);

        const actual = service.value;

        expect(actual).toEqual(expected);
    });
});



