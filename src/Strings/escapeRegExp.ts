import { ESCAPE_REGEX_SEARCH } from './_consts.js';

export default function escapeRegExp(str: string): string
{
    return str.replace(ESCAPE_REGEX_SEARCH, "\\$&");
}
