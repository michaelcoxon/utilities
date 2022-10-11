import DefaultComparers from './DefaultComparers';
import MapComparer from './MapComparer';
import testComparer from '../TestHelpers/testComparer';

interface ITestObject
{
    value: number;
}

const createComparer = () => new MapComparer<ITestObject, number>(i => i.value, DefaultComparers.NumberComparer);

const xIsLess: { x: ITestObject; y: ITestObject; } = { x: { value: -1 }, y: { value: 10 }, };
const sameValue: { x: ITestObject; y: ITestObject; } = { x: { value: -1 }, y: { value: -1 }, };
const xIsMore: { x: ITestObject; y: ITestObject; } = { x: { value: 10 }, y: { value: -1 }, };

testComparer("MapComparer", createComparer, xIsLess, sameValue, xIsMore);
