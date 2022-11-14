import getFileName from './getFileName.js';

/**
 * Returns the filename portion of a path without the file extension.
 * @param path
 */

export default function getFileNameWithoutExtension(path: string): string
{
    const fileName = getFileName(path);

    if (fileName.indexOf('.') == -1)
    {
        return fileName;
    }

    return fileName.substring(0, fileName.lastIndexOf('.'));
}
