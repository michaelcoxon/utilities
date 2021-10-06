import { IHttpRequest, IHttpFilter } from '../interfaces/HttpClientInterfaces';

/**
 * applies the filters to the request
 * @returns true if the request should be cancelled.
 */



export default async function applyFiltersToRequestAsync(request: IHttpRequest, filters: IHttpFilter[]): Promise<boolean>
{
    let notCancel = true;
    const filtersCopy = [...filters];
    let filter = filtersCopy.shift();

    while (filter)
    {
        if (await filter.canHandleRequestAsync(request))
        {
            notCancel = notCancel && (!(await filter.handleRequestAsync(request)) || true);
        }

        if (!notCancel)
        {
            break;
        }

        filter = filtersCopy.shift();
    }

    return !notCancel;
}
