import { IType } from './_types.js';
import ObjectType from './ObjectType.js';

const NumberType: IType = Object.seal({
    fullName: 'Number',
    name: 'Number',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: Number,
});

export default NumberType;