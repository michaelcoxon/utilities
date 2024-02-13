import convertQueryStringItemToObject from './utils/convertQueryStringItemToObject';
import deserializeQS from './utils/deserializeQS';
import serializeQueryStringItems from './utils/serializeQueryStringItems';
import { QueryStringItem } from './_types';
import { convertObjectToQueryStringItem } from './utils/convert';



export default class QueryStringCollection
{
    readonly #items: QueryStringItem[];

    constructor(items: QueryStringItem[] = [])
    {
        this.#items = items;
    }

    public get items(): QueryStringItem[]
    {
        return this.#items;
    }

    public item(name: string): unknown
    {
        const items = this.items.filter(i => i.name === name);
        if (items.length > 1)
        {
            return items.map(i => i.value);
        }
        else if (items.length > 0)
        {
            return items[0].value;
        }
    }

    public toObject(): Record<string, unknown>
    {
        return convertQueryStringItemToObject(this.#items);
    }

    public toString(): string
    {
        return serializeQueryStringItems(this.#items, true);
    }

    public static merge(...queryStringCollections: QueryStringCollection[]): QueryStringCollection
    {
        return QueryStringCollection.createFromObject(Object.assign({}, ...queryStringCollections.map(qsc => qsc.toObject())));
    }

    public static createFromQueryString(queryString: string)
    {
        return new QueryStringCollection(deserializeQS(queryString));
    }

    public static createFromObject(queryStringObject: Record<string, unknown>)
    {
        return new QueryStringCollection(convertObjectToQueryStringItem(queryStringObject));
    }
}
