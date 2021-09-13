import JsonConfigurationSection from './JsonConfigurationSection';
import { IConfiguration, IConfigurationBuilder, IConfigurationSection } from '../_types';
import { isUndefinedOrNull } from '../../TypeHelpers';


export default class JsonConfigurationBuilder implements IConfigurationBuilder
{
    private readonly _configs: string[] = [];
    private _configuration?: IConfiguration;

    public build(): IConfiguration
    {
        if (isUndefinedOrNull(this._configuration))
        {
            try
            {
                return this._configuration = new JsonConfiguration(this._configs.reduce((p, c) => ({ ...p, ...JSON.parse(c) }), {}));
            }
            finally
            {
                this._configs.length = 0;
            }
        }
        return this._configuration;
    }

    public append(json: string): this
    {
        this._configs.push(json);
        return this;
    }
}

class JsonConfiguration implements IConfiguration
{
    private readonly _root: IConfigurationSection;

    constructor(source: any)
    {
        this._root = new JsonConfigurationSection(source);
    }

    public get root(): IConfigurationSection
    {
        return this._root;
    }

    getSection(key: string): IConfigurationSection
    {
        return this.root.getSection(key);
    }

    get<T = any>(key?: string): T
    {
        return this.root.get(key);
    }
}