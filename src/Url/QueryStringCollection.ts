import convertObjectToQueryStringItem from './utils/convertObjectToQueryStringItem.js';
import convertQueryStringItemToObject from './utils/convertQueryStringItemToObject.js';
import deserializeQS from './utils/deserializeQS.js';
import serializeQueryStringItems from './utils/serializeQueryStringItems.js';
import { QueryStringItem } from './_types.js';



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

    public item(name: string): any
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

    public toObject(): Record<string, any>
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

    public static createFromObject(queryStringObject: Record<string, any>)
    {
        return new QueryStringCollection(convertObjectToQueryStringItem(queryStringObject));
    }
}
