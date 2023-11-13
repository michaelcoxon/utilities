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
            for(const config of this.#configs)
            {
                mergedConfig = mergeWith(mergedConfig, config,customizer);
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

function customizer(objValue, srcValue) {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  }