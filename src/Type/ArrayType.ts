import { IType } from './_types';
import ObjectType from './ObjectType';

const ArrayType: IType = Object.seal({
    fullName: 'Array',
    name: 'Array',
    namespace: '',
    baseType: ObjectType,
    isArray: true,
    factory: Array,
});

export default ArrayType;