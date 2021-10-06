import { IHttpFilter, IHttpResponse } from '../interfaces/HttpClientInterfaces';

/**
 * applies the filters to the response
 * @returns true if the response should be cancelled.
 */

export default async function applyFiltersToResponseAsync(response: IHttpResponse, filters: IHttpFilter[]): Promise<boolean>
{
    let notCancel = true;
    const filtersCopy = [...filters];
    let filter = filtersCopy.shift();

    while (filter)
    {
        if (await filter.canHandleResponseAsync(response))
        {
            notCancel = notCancel && (!(await filter.handleResponseAsync(response)) || true);
        }

        if (!notCancel)
        {
            break;
        }

        filter = filtersCopy.shift();
    }

    return !notCancel;
}
