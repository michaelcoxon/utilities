import { IContentType } from '../interfaces/HttpClientInterfaces';



export default function contentTypeToString(contentType: IContentType | undefined): string | undefined
{
    if (contentType)
    {
        if (contentType.encoding)
        {
            return `${contentType.contentType}; charset=${contentType.encoding}`;
        }

        else
        {
            return contentType.contentType;
        }
    }
}
