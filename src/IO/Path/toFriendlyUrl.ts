/**
 * convert a string into a url friendly version
 * @param str
 */
export default function toFriendlyUrl(str: string): string;
/**
 * convert a string into a url friendly version
 * @param str
 * @param noTrim if true, it will leave hyphens (-) on the
 *               start and end of the url. You probably will
 *               never want this.
 */
export default function toFriendlyUrl(str: string, noTrim: boolean): string;
export default function toFriendlyUrl(str: string, noTrim = false): string
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