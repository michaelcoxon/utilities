import { IType } from './_types';
import ObjectType from './ObjectType';

const DateType: IType = Object.seal({
    fullName: 'Date',
    name: 'Date',
    namespace: '',
    baseType: ObjectType,
    isArray: false,
    factory: Date
});

export default DateType;