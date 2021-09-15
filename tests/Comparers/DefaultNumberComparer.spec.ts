import { DefaultComparers } from '../../src';
import testComparer from '../TestHelpers/testComparer';

const createComparer = () => DefaultComparers.NumberComparer;

const xIsLess: { x: number; y: number; } = { x: -1, y: 10 };
const sameValue: { x: number; y: number; } = { x: -1, y: -1 };
const xIsMore: { x: number; y: number; } = { x: 10, y: -1 };

testComparer("DefaultNumberComparer_new", createComparer, xIsLess, sameValue, xIsMore);