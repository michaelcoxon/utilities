import { ExpressionType } from './ExpressionType';

/*

Array Expression

const instruction =
[
    ExpressionType,
    ...params: typeof instruction[]
]


*/

export type ValueType = number | string | boolean;
export type Instruction = [ExpressionType, ...((Instruction | ValueType)[])];
export type AddInstruction = [ExpressionType.Add, ...(Instruction[])];
export type AndAlsoInstruction = [ExpressionType.AndAlso, ...(Instruction[])];
export type ConstantInstruction = [ExpressionType.Constant, ValueType];
