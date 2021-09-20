import { IType } from './_types';
import ObjectType from './ObjectType';

const NumberType: IType = Object.seal({
    fullName: 'Number',
    name: 'Number',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: Number,
});

export default NumberType;