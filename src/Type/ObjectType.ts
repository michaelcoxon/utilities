import { IType } from './_types';


let __objectType;
const ObjectType: IType = __objectType = Object.seal({
    fullName: 'Object',
    name: 'Object',
    namespace: '',
    baseType: __objectType,
    isArray: false,
    factory: Object,
});

export default ObjectType;
