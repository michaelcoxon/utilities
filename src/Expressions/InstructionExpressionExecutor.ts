import NotImplementedException from '../Exceptions/NotImplementedException.js';

import isBoolean from '../TypeHelpers/isBoolean.js';
import isNumber from '../TypeHelpers/isNumber.js';
import isString from '../TypeHelpers/isString.js';
import { ExpressionType } from './ExpressionType.js';
import { AddInstruction, ConstantInstruction, Instruction, ValueType } from './Instruction.js';

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