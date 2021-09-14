import JsonConfigurationSection from './JsonConfigurationSection';
import { IConfiguration, IConfigurationSection } from '../Configuration.types';
import { ConfigValue } from './Json.types';

export default class JsonConfiguration implements IConfiguration
{
    readonly #root: IConfigurationSection;

    constructor(source: Record<string, ConfigValue>)
    {
        this.#root = new JsonConfigurationSection(source);
    }

    public get root(): IConfigurationSection
    {
        return this.#root;
    }

    getSection(key: string): IConfigurationSection
    {
        return this.root.getSection(key);
    }

    get<T = ConfigValue>(key?: string): T
    {
        return this.root.get(key);
    }
}
