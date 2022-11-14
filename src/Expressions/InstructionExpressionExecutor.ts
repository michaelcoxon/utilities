import { NotImplementedException } from '../Exceptions';

import { isBoolean, isNumber, isString } from '../TypeHelpers';
import { ExpressionType } from './ExpressionType';
import { AddInstruction, ConstantInstruction, Instruction, ValueType } from './Instruction';

export default function execute(instruction: (Instruction | ValueType))
{
    // number | string | boolean
    if (isNumber(instruction) || isString(instruction) || isBoolean(instruction))
    {
        return instruction;
    }

    switch (instruction[0])
    {
        case ExpressionType.Add: return add(instruction as AddInstruction);
        case ExpressionType.Constant: return constant(instruction as ConstantInstruction);



        default: throw new NotImplementedException(JSON.stringify(instruction));
    }
}

function add(instruction: AddInstruction)
{
    return execute(instruction[1]) + execute(instruction[2]);
}

function constant(instruction: ConstantInstruction)
{
    return execute(instruction[1]);
}