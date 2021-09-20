import { IType } from './_types';
import ObjectType from './ObjectType';

const StringType: IType = Object.seal({
    fullName: 'String',
    name: 'String',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: String,
});

export default StringType;