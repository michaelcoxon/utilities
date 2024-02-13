import { ExpressionType } from './ExpressionType';
import InstructionExpressionExecutor from './InstructionExpressionExecutor';
import {  Instruction } from './Instruction';
import createConstant from './utils/createConstant';
import {  ConstantExpressionType } from './ConstantExpression';
import { Expression } from './Expression';
import InstructionExpressionVisitor from './InstructionExpressionVisitor';
describe("InstructionExpressionExecutor", () =>
{
    it("should execute the Instructions", () =>
    {
        // 30 + 10 + 11 + 21 + 41
        const program: Instruction = [
            ExpressionType.Add, [
                ExpressionType.Add,
                [ExpressionType.Constant, 30],
                [ExpressionType.Add, [
                    ExpressionType.Add,
                    [ExpressionType.Constant, 10],
                    [ExpressionType.Constant, 11]
                ],
                [ExpressionType.Constant, 21]
                ]
            ],
            [ExpressionType.Constant, 41]
        ];

        console.log(program);

        const expected = 113;// 30 + 10 + 11 + 21 + 41
        const actual = InstructionExpressionExecutor(program);

        expect(actual).toEqual(expected);
    });

    it("should execute the Instructions as values", () =>
    {
        const program: Instruction = [1, [1, [5, 30], [1, [1, [5, 10], [5, 11]], [5, 21]]], [5, 41]];
        const expected = 113;// 30 + 10 + 11 + 21 + 41
        const actual = InstructionExpressionExecutor(program);
        expect(actual).toEqual(expected);
    });

    it("should execute the Instructions from Expressions", () =>
    {
        // 30 + 10 + 11 + 21 + 41

        const c30 = createConstant(30, ConstantExpressionType.Number);
        const c10 = createConstant(10, ConstantExpressionType.Number);
        const c11 = createConstant(11, ConstantExpressionType.Number);
        const c21 = createConstant(21, ConstantExpressionType.Number);
        const c41 = createConstant(41, ConstantExpressionType.Number);

        function toInstruction(expr: Expression): Instruction
        {
            const visitor = new InstructionExpressionVisitor();
            visitor.visit(expr);
            return visitor.value;
        }

        const program: Instruction = [
            ExpressionType.Add, [
                ExpressionType.Add,
                toInstruction(c30),
                [ExpressionType.Add, [
                    ExpressionType.Add,
                    toInstruction(c10),
                    toInstruction(c11)
                ],
                toInstruction(c21)
                ]
            ],
            toInstruction(c41)
        ];

        console.log(program);

        const expected = 113;// 30 + 10 + 11 + 21 + 41
        const actual = InstructionExpressionExecutor(program);

        expect(actual).toEqual(expected);
    });
});



