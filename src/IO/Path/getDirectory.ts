import combine from "./combine";

/**
 * Return the directory portion of a path
 * @param path
 */

export default function getDirectory(path: string): string
{
    if (path.endsWith('/') || path.endsWith('\\'))
    {
        return path;
    }
    else if (path.startsWith('/') || path.startsWith('\\'))
    {
        return combine(...path.split(path[0]).slice(0, -1), path[0]);
    }

    else
    {
        if (path.indexOf('\\') > -1)
        {
            return combine(...path.split('\\').slice(0, -1), '\\');
        }

        return combine(...path.split('/').slice(0, -1), '/');
    }
}
