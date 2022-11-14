import { IType } from './_types.js';
import ObjectType from './ObjectType.js';

const ArrayType: IType = Object.seal({
    fullName: 'Array',
    name: 'Array',
    namespace: '',
    baseType: ObjectType,
    isArray: true,
    factory: Array,
});

export default ArrayType;