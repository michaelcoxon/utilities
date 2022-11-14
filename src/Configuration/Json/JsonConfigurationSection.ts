import ArgumentException from '../../Exceptions/ArgumentException.js';
import isNullOrEmpty from '../../TypeHelpers/isNullOrEmpty.js';
import isObject from '../../TypeHelpers/isObject.js';
import { Undefinable } from '../../Types.js';
import { IConfigurationSection, parseKey } from '../_types.js';
import { ConfigValue } from './Json.types.js';


export default class JsonConfigurationSection implements IConfigurationSection
{
    readonly #source: Record<string, ConfigValue>;

    constructor(source: Record<string, ConfigValue>)
    {
        this.#source = source;
    }

    getSection(key: string): IConfigurationSection
    {
        if (isNullOrEmpty(key))
        {
            return this;
        }

        const keys = parseKey(key);

        let i = 0;
        let result: Record<string, any> = this.#source;

        while (i < keys.length)
        {
            const partial = result[keys[i]];
            if (!isObject(partial))
            {
                throw new ArgumentException("key", "Key is not a section. Try using get");
            }
            result = partial;
            i++;
        }

        return new JsonConfigurationSection(result);
    }

    get<T extends ConfigValue>(): Undefinable<T>;
    get<T extends ConfigValue>(key: string): Undefinable<T>;
    get<T extends ConfigValue>(key?: string): Undefinable<T>
    {
        if (isNullOrEmpty(key))
        {
            return this.#source as any;
        }
        else
        {
            const keys = parseKey(key);

            let i = 0;
            let result: Record<string, any> = this.#source;

            while (i < keys.length)
            {
                const value = result[keys[i]];

                if (isObject(value))
                {
                    result = value;
                }
                else
                {
                    return value;
                }

                i++;
            }

            return result as any;
        } 
    }
}