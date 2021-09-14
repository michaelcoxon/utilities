import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';
import { IConfiguration, IConfigurationBuilder } from '../Configuration.types';
import { ConfigValue } from './Json.types';
import JsonConfiguration from './JsonConfiguration';


export default class JsonConfigurationBuilder implements IConfigurationBuilder
{
    #reload = false;
    readonly #configs: Record<string, ConfigValue>[] = [];
    #configuration?: IConfiguration;

    public build(reload?: boolean): IConfiguration
    {
        if (reload || this.#reload || isUndefinedOrNull(this.#configuration))
        {
            this.#configuration = new JsonConfiguration(this.#configs.reduce((p, c) => ({ ...p, ...c }), {}));
            // clear
            this.#configs.length = 0;
            // complete reload if needed
            if (this.#reload)
            {
                this.#reload = false;
            }
        }
        return this.#configuration;
    }

    public append(json: string): this
    {
        this.#configs.push(JSON.parse(json));
        if (!this.#reload)
        {
            this.#reload = true;
        }
        return this;
    }
}

