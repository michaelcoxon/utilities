import DefaultComparer from './DefaultComparer.js';
import DefaultNumberComparer from './DefaultNumberComparer.js';
import DefaultObjectComparer from './DefaultObjectComparer.js';
import DefaultStringComparer from './DefaultStringComparer.js';

const DefaultComparers = {
    DefaultComparer: new DefaultComparer<any>(),
    StringComparer: new DefaultStringComparer(),
    NumberComparer: new DefaultNumberComparer(),
    ObjectComparer: new DefaultObjectComparer(),
};

export default DefaultComparers;