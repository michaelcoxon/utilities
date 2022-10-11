import JsonConfigurationSection from './JsonConfigurationSection';
import { IConfiguration, IConfigurationSection } from '../_types';
import { ConfigValue } from './Json.types';

export default class JsonConfiguration implements IConfiguration
{
    readonly #root: JsonConfigurationSection;

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

    get<T extends ConfigValue = ConfigValue>(key?: string): T
    {
        return this.root.get(key);
    }
}
