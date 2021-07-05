import ArgumentException from "./Exceptions/ArgumentException";
import Strings from './Strings';

var URI_REGEX = /^(([^:]+:\\)|([^:/?#]+:)?(\/\/([^/?#]*)[\\/])?)(([^\\/]+[\\/])*)([^/?#]*)(\?[^#]*)?(#.*)?$/gi;

/** Utility namespace for path related functions. */
namespace Path
{
    /**
     * Returns the filename portin of a path.
     * @param path
     */
    export function getFileName(path: string): string
    {
        return Strings.trimStart(path, '/\\').replace(URI_REGEX, "$8");
    }

    /**
     * Return the directory portion of a path
     * @param path
     */
    export function getDirectory(path: string): string
    {
        if (path.endsWith('/') || path.endsWith('\\'))
        {
            return path;
        }
        else if (path.startsWith('/') || path.startsWith('\\'))
        {
            return Path.combine(...path.split(path[0]).slice(0, -1), path[0]);
        }
        else
        {
            if (path.indexOf('\\') > -1)
            {
                return Path.combine(...path.split('\\').slice(0, -1), '\\');
            }

            return Path.combine(...path.split('/').slice(0, -1), '/');
        }
    }

    /**
     * Returns the extension portion of a path
     * @param path
     */
    export function getExtension(path: string): string
    {
        let fileName = Path.getFileName(path);

        if (fileName.indexOf('.') == -1)
        {
            return "";
        }

        return fileName.substring(fileName.lastIndexOf('.'));
    }

    /**
     * Returns the filename portion of a path without the file extension.
     * @param path
     */
    export function getFileNameWithoutExtension(path: string): string
    {
        let fileName = Path.getFileName(path);

        if (fileName.indexOf('.') == -1)
        {
            return fileName;
        }

        return fileName.substring(0, fileName.lastIndexOf('.'));
    }

    /**
     * convert a string into a url friendly version
     * @param str
     */
    export function toFriendlyUrl(str: string): string;
    /**
     * convert a string into a url friendly version
     * @param str
     * @param noTrim if true, it will leave hyphens (-) on the
     *               start and end of the url. You probably will
     *               never want this.
     */
    export function toFriendlyUrl(str: string, noTrim: boolean): string;
    export function toFriendlyUrl(str: string, noTrim: boolean = false): string
    {
        let out = str.toLowerCase();
        out = out.replace(/&/g, " and ");
        out = out.replace(/@/g, " at ");
        out = out.replace(/[,'"]/g, "");
        out = out.replace(/[^a-z0-9]+/g, "-");
        out = out.replace(/-+/g, "-");

        if (!noTrim)
        {
            out = out.replace(/(^-+)|(-+$)/g, '');
        }

        return out;
    }

    /**
     * Combines path segments into a path. Auto-senses 'slash' direction.
     * @param args
     */
    export function combine(...args: string[]): string
    {
        if (args.length == 0)
        {
            throw new ArgumentException("path", "Provide at least 1 path to combine");
        }

        let segments = args.map((arg, i) =>
        {
            if (i == 0)
            {
                return Strings.trimEnd(arg, '/\\');
            }
            else
            {
                return Strings.trim(arg, '/\\');
            }
        });

        if (args.findIndex(i => i.indexOf('\\') > -1) > -1)
        {
            return segments.join('\\');
        }

        return segments.join('/');
    }
}

export default Path;
