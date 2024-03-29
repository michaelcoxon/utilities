import QueryStringCollection from './QueryStringCollection';

/** Defines a Url */
export default class Url
{
    #url: string;
    #query: QueryStringCollection;

    /**
     * Creates a new Url
     * @param baseUrl The Url to base this instance off of
     * @param queryStringObject Query string items as a plain object to add/update on the base Url. Set an item to undefined | null to remove it.
     */
    constructor(baseUrl: string|Url, queryStringObject?: Record<string, unknown>)
    {
        const [url, query] = baseUrl.toString().split('?', 2);

        this.#url = url;

        if (query === undefined)
        {
            this.#query = new QueryStringCollection();
        }
        else
        {
            this.#query = QueryStringCollection.createFromQueryString(query);
        }

        if (queryStringObject !== undefined)
        {
            this.#query = QueryStringCollection.merge(this.#query, QueryStringCollection.createFromObject(queryStringObject));
        }
    }

    /** Gets the query section of this Url */
    public get query(): QueryStringCollection
    {
        return this.#query;
    }

    /** Sets the query section of this Url */
    public set query(value: QueryStringCollection)
    {
        this.#query = value;
    }

    public toString(): string
    {
        return this.#url + this.query.toString();
    }

    public valueOf(): string
    {
        return this.toString();
    }
}
