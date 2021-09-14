import DefaultComparer from './DefaultComparer';
import DefaultNumberComparer from './DefaultNumberComparer';
import DefaultObjectComparer from './DefaultObjectComparer';
import DefaultStringComparer from './DefaultStringComparer';

export const DefaultComparers = {
    DefaultComparer: new DefaultComparer<any>(),
    StringComparer: new DefaultStringComparer(),
    NumberComparer: new DefaultNumberComparer(),
    ObjectComparer: new DefaultObjectComparer(),
};

export default DefaultComparers;