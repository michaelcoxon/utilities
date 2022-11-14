import { IType } from "./_types.js";
import ObjectType from './ObjectType.js';

const FunctionType: IType = Object.seal({
    fullName: 'Function',
    name: 'Function',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: Function,
});

export default FunctionType;
