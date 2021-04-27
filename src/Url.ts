import QueryStringCollection from './QueryStringCollection';

/** Represents a string or a Url */
export type StringOrUrl = Url | string;

/** Element in a QueryStringCollection */
export type QueryStringItem = { name: string; value: any; }

/**
 * Convert a string or a Url to a Url
 * @param stringOrUrl
 */
export function stringOrUrlToUrl(stringOrUrl: StringOrUrl): Url
{
    if (stringOrUrl instanceof Url)
    {
        return stringOrUrl;
    }
    else
    {
        return new Url(stringOrUrl);
    }
}

/**
 * Convert a string or Url to a string
 * @param stringOrUrl
 */
export function stringOrUrlToString(stringOrUrl: StringOrUrl): string
{
    if (stringOrUrl instanceof Url)
    {
        return stringOrUrl.toString();
    }
    else
    {
        return stringOrUrl;
    }
}

/** Defines a Url */
export default class Url
{
    private _url: string;
    private _query: QueryStringCollection;

    /**
     * Creates a new Url
     * @param baseUrl The Url to base this instance off of
     * @param queryStringObject Query string items as a plain object to add/update on the base Url. Set an item to undefined | null to remove it.
     */
    constructor(baseUrl: StringOrUrl, queryStringObject?: { [key: string]: any })
    {
        const [url, query] = stringOrUrlToString(baseUrl).split('?', 2);
        this._url = url;

        if (query === undefined)
        {
            this._query = new QueryStringCollection();
        }
        else
        {
            this._query = QueryStringCollection.createFromQueryString(query);
        }

        if (queryStringObject !== undefined)
        {
            this._query = QueryStringCollection.merge(this._query, QueryStringCollection.createFromObject(queryStringObject));
        }
    }

    /** Gets the query section of this Url */
    public get query(): QueryStringCollection
    {
        return this._query;
    }

    /** Sets the query section of this Url */
    public set query(value: QueryStringCollection)
    {
        this._query = value;
    }


    public toString(): string
    {
        return this._url + this.query.toString();
    }

    public valueOf(): string
    {
        return this.toString();
    }
}


