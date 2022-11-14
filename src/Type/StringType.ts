import { IType } from './_types.js';
import ObjectType from './ObjectType.js';

const StringType: IType = Object.seal({
    fullName: 'String',
    name: 'String',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: String,
});

export default StringType;