import { IType } from './_types.js';

let __undefinedType;
const UndefinedType: IType = __undefinedType = Object.seal({
    fullName: 'undefined',
    name: 'undefined',
    namespace: '',
    baseType: __undefinedType,
    isArray: false,
    factory: () => undefined,
});

export default UndefinedType;