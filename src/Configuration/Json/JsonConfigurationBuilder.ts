import { isString } from '../..';
import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';
import { IConfiguration, IConfigurationBuilder } from '../Configuration.types';
import { ConfigValue } from './Json.types';
import JsonConfiguration from './JsonConfiguration';
import { merge } from 'lodash';

export default class JsonConfigurationBuilder implements IConfigurationBuilder
{
    #reload = false;
    readonly #configs: Record<string, ConfigValue>[] = [];
    #configuration?: IConfiguration;

    public build(reload?: boolean): IConfiguration
    {
        if (reload || this.#reload || isUndefinedOrNull(this.#configuration))
        {
            let mergedConfig = {};
            for(const config of this.#configs)
            {
                merge(mergedConfig, config);
            }
            this.#configuration = new JsonConfiguration(mergedConfig);
            this.#reload = false;
        }
        return this.#configuration;
    }
    public append(json: string): this;
    public append(array: any[]): this;
    public append(object: Record<string, any>): this;
    public append(value: any): this
    {
        if (isString(value))
        {
            value = JSON.parse(value);
        }
        this.#configs.push(value);
        if (!this.#reload)
        {
            this.#reload = true;
        }
        return this;
    }
}

