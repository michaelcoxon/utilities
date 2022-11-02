import { BinaryExpression } from '../BinaryExpression';
import { ConstantExpression, ConstantExpressionType } from '../ConstantExpression';
import { ExpressionType } from '../ExpressionType';
import createAdd from './createAdd';
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

    it("should createAdd for 1 + 2", () =>
    {
        const one = createConstant(1, ConstantExpressionType.Number);
        const two = createConstant(2, ConstantExpressionType.Number);
        const actual = createAdd(one, two);

        expect(actual).toStrictEqual(expected);
    });
});