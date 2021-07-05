import ArgumentException from '../../Exceptions/ArgumentException';
import Strings from '../../Strings';
import { IConfigurationSection, parseKey } from '../_types';



export default class JsonConfigurationSection implements IConfigurationSection
{
    private readonly _source: {};

    constructor(source: {})
    {
        this._source = source;
    }

    getSection(key: string): IConfigurationSection
    {
        const keys = parseKey(key);

        let i = 0;
        let result = this._source;

        while (i < keys.length)
        {
            const partial = result[keys[i]];
            if (!Object.isObject(partial))
            {
                throw new ArgumentException("key", "Key is not a section. Try using get");
            }
            result = partial;
        }

        return new JsonConfigurationSection(result);
    }

    get<T = any>(): T;
    get<T = any>(key: string): T;
    get<T = any>(key?: string): T
    {
        if (Strings.isNullOrEmpty(key))
        {
            return this._source as T;
        }
        else
        {
            const keys = parseKey(key!);

            let i = 0;
            let result = this._source;

            while (i < keys.length)
            {
                result = result[keys[i]];
            }

            return result as T;
        }
    }

}