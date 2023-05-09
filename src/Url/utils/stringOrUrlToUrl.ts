import Url from '../Url';

/**
 * Convert a string or a Url to a Url
 * @param stringOrUrl
 */

export default function stringOrUrlToUrl(stringOrUrl: string | Url): Url
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
