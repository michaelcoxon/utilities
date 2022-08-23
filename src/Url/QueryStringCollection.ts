import convertObject from './helpers/convertObject';
import convertToObject from './helpers/convertToObject';
import deserialize from './helpers/deserialize';
import serializeQueryStringItems from './helpers/serializeQueryStringItems';
import { QueryStringItem } from './_types';



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
        return convertToObject(this.#items);
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
        return new QueryStringCollection(deserialize(queryString));
    }

    public static createFromObject(queryStringObject: Record<string, any>)
    {
        return new QueryStringCollection(convertObject(queryStringObject));
    }
}
