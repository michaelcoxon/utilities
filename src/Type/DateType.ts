import { IType } from './_types.js';
import ObjectType from './ObjectType.js';

const DateType: IType = Object.seal({
    fullName: 'Date',
    name: 'Date',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: Date
});

export default DateType;