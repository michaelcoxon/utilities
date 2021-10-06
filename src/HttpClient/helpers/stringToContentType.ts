import trim from '../../Strings/trim';
import isNullOrEmpty from '../../TypeHelpers/isNullOrEmpty';
import { IContentType } from '../interfaces/HttpClientInterfaces';


export default function stringToContentType(strContentType: string | undefined): IContentType | undefined
{
    if (strContentType)
    {
        const [mediaType, charset] = strContentType.split(';')
            .map(i => trim(i))
            .filter(i => !isNullOrEmpty(i));

        let contentType: IContentType = {
            contentType: mediaType,
            encoding: undefined
        };

        if (charset)
        {
            const [name, value] = strContentType.split('=')
                .map(i => trim(i))
                .filter(i => !isNullOrEmpty(i));

            contentType.encoding = value;
        }

        return contentType;
    }
}
