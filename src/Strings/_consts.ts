import emptyImpl from '../Utilities/empty';

export const empty = emptyImpl;
export const newLine = "\n";
export const WHITESPACE = "\\s\\uFEFF\\xA0";
export const FORMAT_REGEX = /{(\d+):?([^}]+)?}/g;
export const ESCAPE_REGEX_SEARCH = /[-[\]/{}()*+?.\\^$|]/g;
export const KEY_WORD_SEPARATOR = '__';
export const KEY_VALUE_SEPARATOR = ":";