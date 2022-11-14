import { KEY_WORD_SEPARATOR } from '../../Strings/_consts.js';


export default function createStorageKey(...params: string[])
{
    return params.join(KEY_WORD_SEPARATOR);
}
