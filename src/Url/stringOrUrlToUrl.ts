import Url from './Url';
import { StringOrUrl } from './_types';

/**
 * Convert a string or a Url to a Url
 * @param stringOrUrl
 */

export default function stringOrUrlToUrl(stringOrUrl: StringOrUrl): Url
{
    if (stringOrUrl instanceof Url)
    {
        return stringOrUrl;
    }

    else
    {
        return new Url(stringOrUrl);
    }
}
