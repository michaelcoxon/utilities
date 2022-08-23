import trim from '../../Strings/trim';
import isNullOrEmpty from '../../TypeHelpers/isNullOrEmpty';




export default function parseValue(value: string): string | number | boolean
{
    //
    // null or empty
    //
    if (isNullOrEmpty(value))
    {
        return value;
    }

    value = trim(value);

    //
    // booleans
    //
    if (value.toLowerCase() === 'true')
    {
        return true;
    }
    else if (value.toLowerCase() === 'false')
    {
        return false;
    }






    // 
    // integer
    //
    else if (/^\d+$/.test(value))
    {
        return parseInt(value);
    }






    // 
    // float
    //
    else if (/^\d+.\d+$/.test(value))
    {
        return parseFloat(value);
    }








    // 
    // string
    //
    else
    {
        return value;
    }
}
