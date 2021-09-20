import { IType } from './_types';
import ObjectType from './ObjectType';

const BooleanType: IType = Object.seal({
    fullName: 'Boolean',
    name: 'Boolean',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: Boolean,
});

export default BooleanType;