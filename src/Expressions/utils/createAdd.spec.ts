import { BinaryExpression } from '../BinaryExpression';
import { ConstantExpression, ConstantExpressionType } from '../ConstantExpression';
import { ExpressionType } from '../ExpressionType';
import createAdd from './createAdd';
import createBinaryExpression from './createBinaryExpression';
import createConstant from './createConstant';


describe("createAdd", () =>
{
    const expected: BinaryExpression = {
        nodeType: ExpressionType.Add,
        left: {
            nodeType: ExpressionType.Constant,
            type: ConstantExpressionType.Number,
            value: 1,
        } as ConstantExpression,
        right: {
            nodeType: ExpressionType.Constant,
            type: ConstantExpressionType.Number,
            value: 2,
        } as ConstantExpression
    };

    it("should createAdd for 1 + 2 the long way", () =>
    {
        const nodeType = ExpressionType.Add;
        const left: ConstantExpression = {
            nodeType: ExpressionType.Constant,
            type: ConstantExpressionType.Number,
            value: 1,
        };
        const right: ConstantExpression = {
            nodeType: ExpressionType.Constant,
            type: ConstantExpressionType.Number,
            value: 2,
        };
        const actual = createBinaryExpression(nodeType, left, right);

        expect(actual).toStrictEqual(expected);
    });

    it("should createAdd for 1 + 2 the short way", () =>
    {
        const left = createConstant(1, ConstantExpressionType.Number);
        const right = createConstant(2, ConstantExpressionType.Number);
        const actual = createAdd(left, right);

        expect(actual).toStrictEqual(expected);
    });
});