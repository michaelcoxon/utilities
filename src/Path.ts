import { ArgumentException } from "./Exceptions";
import { Strings } from './Strings';

var URI_REGEX = /^(([^:]+:\\)|([^:/?#]+:)?(\/\/([^/?#]*)[\\/])?)(([^\\/]+[\\/])*)([^/?#]*)(\?[^#]*)?(#.*)?$/gi;

export namespace Path
{
    export function getFileName(path: string): string
    {
        return path.replace(URI_REGEX, "$8");
    }

    export function getDirectory(path: string): string
    {
        return path.replace(URI_REGEX, "$6");
    }

    export function getExtension(path: string): string
    {
        let fileName = Path.getFileName(path);

        if (fileName.indexOf('.') == -1)
        {
            return "";
        }

        return fileName.substring(fileName.lastIndexOf('.'));
    }

    export function getFileNameWithoutExtension(path: string): string
    {
        let fileName = Path.getFileName(path);

        if (fileName.indexOf('.') == -1)
        {
            return fileName;
        }

        return fileName.substring(0, fileName.lastIndexOf('.'))
    }

    /**
     * convert a string into a url friendly version
     * @param str
     * @param noTrim if true, it will leave hyphens (-) on the
     *               start and end of the url. You probably will
     *               never want this.
     */
    export function toFriendlyUrl(str: string, noTrim: boolean = false): string
    {
        let out = str.toLowerCase();
        out = out.replace(/&/g, " and ");
        out = out.replace(/@/g, " at ");
        out = out.replace(/[,'"]/g, "");
        out = out.replace(/[^a-z0-9]+/g, "-");
        out = out.replace(/^-+|-+$/g, "-");

        if (!noTrim)
        {
            out = out.replace(/^-+|-+$/g, '');
        }

        return out;
    }

   export function combine(...args: string[]): string
    {
        if (args.length == 0)
        {
            throw new ArgumentException("path", "Provide at least 1 path to combine");
        }

        let segments = args.map(arg => Strings.trim(arg, '/\\'));

        if (args[0].indexOf('\\') != -1)
        {
            return segments.join('\\');
        }

        return segments.join('/');
    }
}