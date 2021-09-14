import Url from './Url';
import { StringOrUrl } from './Url.types';

/**
 * Convert a string or Url to a string
 * @param stringOrUrl
 */

export default function stringOrUrlToString(stringOrUrl: StringOrUrl): string
{
    if (stringOrUrl instanceof Url)
    {
        return stringOrUrl.toString();
    }

    else
    {
        return stringOrUrl;
    }
}
