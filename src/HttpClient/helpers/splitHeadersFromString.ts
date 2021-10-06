import trim from '../../Strings/trim';
import isNullOrEmpty from '../../TypeHelpers/isNullOrEmpty';


export default function splitHeadersFromString(headers: string): { name: string; value: string; }[]
{
    return headers
        .split(/\r|\n/g)
        .map(h => trim(h))
        .filter(h => !isNullOrEmpty(h))
        .map(h =>
        {
            const [name, value] = h.split(':', 2);
            return { name, value };
        });
}
