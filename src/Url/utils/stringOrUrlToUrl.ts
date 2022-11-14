import Url from '../Url.js';
import { StringOrUrl } from '../_types.js';

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
