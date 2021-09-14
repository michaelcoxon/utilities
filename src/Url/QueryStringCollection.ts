import * as QueryStringHelper from "./QueryStringHelper";
import { QueryStringItem } from './Url.types';



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
        return QueryStringHelper.convertToObject(this.#items);
    }

    public toString(): string
    {
        return QueryStringHelper.serializeQueryStringItems(this.#items, true);
    }

    public static merge(...queryStringCollections: QueryStringCollection[]): QueryStringCollection
    {
        return QueryStringCollection.createFromObject(Object.assign({}, ...queryStringCollections.map(qsc => qsc.toObject())));
    }

    public static createFromQueryString(queryString: string)
    {
        return new QueryStringCollection(QueryStringHelper.deserialize(queryString));
    }

    public static createFromObject(queryStringObject: Record<string, any>)
    {
        return new QueryStringCollection(QueryStringHelper.convertObject(queryStringObject));
    }
}
