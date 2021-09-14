import { empty } from '../Strings/_consts';


export default function hashString(str: string): number
{
    if (str.length === 0)
    {
        return 0;
    }
    else if (Array.prototype.reduce === undefined)
    {
        let hash = 0, i: number, chr: number;
        for (i = 0; i < str.length; i++)
        {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    else
    {
        return str.split(empty)
            .map(chr => chr.charCodeAt(0))
            .reduce((hash, chr) => (((hash << 5) - hash) + chr) | 0);
    }
}
