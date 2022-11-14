import getFileName from './getFileName.js';

/**
 * Returns the extension portion of a path
 * @param path
 */

export default function getExtension(path: string): string
{
    const fileName = getFileName(path);

    if (fileName.indexOf('.') == -1)
    {
        return "";
    }

    return fileName.substring(fileName.lastIndexOf('.'));
}
