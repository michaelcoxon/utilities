import type Url from './Url.js';

/** Represents a string or a Url */
export type StringOrUrl = Url | string;

/** Element in a QueryStringCollection */
export type QueryStringItem = { name: string; value: string | number | boolean; };


