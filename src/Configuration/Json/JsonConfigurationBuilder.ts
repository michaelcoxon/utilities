import { NotImplementedException } from '../../Exceptions';
import isString from '../../TypeHelpers/isString';
import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';
//import merge from '../../Utilities/merge';
import { IConfiguration, IConfigurationBuilder } from '../_types';
import { ConfigValue } from './Json.types';
import JsonConfiguration from './JsonConfiguration';
import mergeWith from 'lodash/mergeWith';
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
            for (const config of this.#configs)
            {
                mergedConfig = mergeWith(mergedConfig, config, customizer);
            }
            this.#configuration = new JsonConfiguration(mergedConfig);
            this.#reload = false;
        }
        return this.#configuration;
    }
    public append(json: string): this;
    public append(array: unknown[]): this;
    public append(object: Record<string, unknown>): this;
    public append(value: Record<string, unknown> | unknown[] | string): this
    {
        if (isString(value))
        {
            this.#configs.push(JSON.parse(value));
        }
        else if (Array.isArray(value))
        {
            throw new NotImplementedException();
        }
        else
        {
            this.#configs.push(value as Record<string, ConfigValue>);
        }
        if (!this.#reload)
        {
            this.#reload = true;
        }
        return this;
    }
}

function customizer(objValue, srcValue)
{
    if (Array.isArray(objValue))
    {
        return objValue.concat(srcValue);
    }
}