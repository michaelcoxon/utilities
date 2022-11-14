import { IType } from './_types.js';
import ObjectType from './ObjectType.js';

const BooleanType: IType = Object.seal({
    fullName: 'Boolean',
    name: 'Boolean',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: Boolean,
});

export default BooleanType;