import { IType } from "./_types";
import ObjectType from './ObjectType';

const FunctionType: IType = Object.seal({
    fullName: 'Function',
    name: 'Function',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: Function,
});

export default FunctionType;
