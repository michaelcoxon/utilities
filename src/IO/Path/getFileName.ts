import trimStart from '../../Strings/trimStart.js';

const URI_REGEX = /^(([^:]+:\\)|([^:/?#]+:)?(\/\/([^/?#]*)[\\/])?)(([^\\/]+[\\/])*)([^/?#]*)(\?[^#]*)?(#.*)?$/gi;

/**
     * Returns the filename portin of a path.
     * @param path
     */

export default function getFileName(path: string): string
{
    return trimStart(path, '/\\').replace(URI_REGEX, "$8");
}
