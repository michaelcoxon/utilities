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
export type InstructionParameterType = Instruction | ValueType;
export type Instruction = [ExpressionType, ...InstructionParameterType[]];
export type AddInstruction = [ExpressionType.Add, ...InstructionParameterType[]];
export type AndAlsoInstruction = [ExpressionType.AndAlso, ...InstructionParameterType[]];
export type ConstantInstruction = [ExpressionType.Constant, InstructionParameterType];
