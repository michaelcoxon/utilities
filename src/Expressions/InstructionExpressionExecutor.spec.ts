import { ExpressionType } from './ExpressionType';
import InstructionExpressionExecutor from './InstructionExpressionExecutor';
import { Instruction } from './Instruction';


describe("InstructionExpressionExecutor", () =>
{
    it("should execute the Instructions", () =>
    {
        const program: Instruction = [
            ExpressionType.Add, [
                ExpressionType.Add, [
                    ExpressionType.Constant, 30], [
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

        const expected = 113;
        const actual = InstructionExpressionExecutor(program);

        expect(actual).toEqual(expected);
    });

    it("should execute the Instructions as values", () =>
    {
        const program: Instruction = [1, [1, [5, 30], [1, [1, [5, 10], [5, 11]], [5, 21]]], [5, 41]];
        const expected = 113;
        const actual = InstructionExpressionExecutor(program);
        expect(actual).toEqual(expected);
    });
});



