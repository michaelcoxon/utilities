import { IHttpRequestContent, IHttpContentHeaderCollection } from './interfaces/HttpClientInterfaces';
import HttpContentHeaderCollection from './HttpContentHeaderCollection';
import { empty } from '../Strings/_consts';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty';
import { Awaitable } from '..';



export default class MultipartRequestContent<T> implements IHttpRequestContent
{
    readonly headers: IHttpContentHeaderCollection;
    readonly object: T;

    constructor(object: T, headers: IHttpContentHeaderCollection = new HttpContentHeaderCollection())
    {
        this.object = object;
        this.headers = headers;
    }

    public async executeAsync<TResult>(contentWriter: (data?: any) => Awaitable<TResult>): Promise<TResult>
    {
        var formData = new FormData();

        MultipartRequestContent.parseObject(empty, this.object, formData);

        return await contentWriter(formData);
    }

    private static parseObject(key: string, object: any, formData: FormData): void
    {
        if (isUndefinedOrNull(object))
        {
            return;
        }

        if (!isNullOrEmpty(key) && typeof (object) !== 'object')
        {
            formData.append(key, object.toString());
        }

        else
        {
            const file = object as File;
            if (!isNullOrEmpty(key) && file.name && file.lastModified && file.size && file.type)
            {
                formData.append(key, file);
            }

            else
            {
                for (var itemKey in object)
                {
                    const newKey = isNullOrEmpty(key)
                        ? itemKey
                        : `${key}.${itemKey}`;

                    MultipartRequestContent.parseObject(newKey, object[itemKey], formData);
                }
            }
        }
    }
}
