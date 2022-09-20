import { BinaryExpression } from '../BinaryExpression';
import { ConstantExpression, ConstantExpressionType } from '../ConstantExpression';
import { ExpressionType } from '../ExpressionType';
import createAdd from './createAdd';
import createAndAlso from './createAndAlso';
import createBinaryExpression from './createBinaryExpression';
import createConstant from './createConstant';


describe("createAndAlso", () =>
{
    const expected: BinaryExpression = {
        nodeType: ExpressionType.AndAlso,
        left: {
            nodeType: ExpressionType.Constant,
            type: ConstantExpressionType.Boolean,
            value: true,
        } as ConstantExpression,
        right: {
            nodeType: ExpressionType.Constant,
            type: ConstantExpressionType.Boolean,
            value: false,
        } as ConstantExpression
    };

    it("should createAndAlso for true && false the long way", () =>
    {
        const nodeType = ExpressionType.AndAlso;
        const left: ConstantExpression = {
            nodeType: ExpressionType.Constant,
            type: ConstantExpressionType.Boolean,
            value: true,
        };
        const right: ConstantExpression = {
            nodeType: ExpressionType.Constant,
            type: ConstantExpressionType.Boolean,
            value: false,
        };
        const actual = createBinaryExpression(nodeType, left, right);

        expect(actual).toStrictEqual(expected);
    });

    it("should createAndAlso for true && false the short way", () =>
    {
        const left = createConstant(true, ConstantExpressionType.Boolean);
        const right = createConstant(false, ConstantExpressionType.Boolean);
        const actual = createAndAlso(left, right);

        expect(actual).toStrictEqual(expected);
    });
});