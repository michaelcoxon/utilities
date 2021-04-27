import { QueryStringItem } from './Url';
import QueryStringHelper from "./QueryStringHelper";



export default class QueryStringCollection
{
    private readonly _items: QueryStringItem[];

    constructor(items: QueryStringItem[] = [])
    {
        this._items = items;
    }

    public get items(): QueryStringItem[]
    {
        return this._items;
    }

    public item(name: string): any | undefined
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

    public toObject(): { [name: string]: any; }
    {
        return QueryStringHelper.convertToObject(this._items);
    }

    public toString(): string
    {
        return QueryStringHelper.serializeQueryStringItems(this._items, true);
    }

    public static merge(...queryStringCollections: QueryStringCollection[]): QueryStringCollection
    {
        return QueryStringCollection.createFromObject(Object.assign({}, ...queryStringCollections.map(qsc => qsc.toObject())));
    }

    public static createFromQueryString(queryString: string)
    {
        return new QueryStringCollection(QueryStringHelper.deserialize(queryString));
    }

    public static createFromObject(queryStringObject: { [key: string]: any; })
    {
        return new QueryStringCollection(QueryStringHelper.convertObject(queryStringObject));
    }
}
