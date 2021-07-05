
export interface IConfigurationSection
{
    getSection(key: string): IConfigurationSection;
    get<T = any>(key?: string): T;
}

export interface IConfiguration extends IConfigurationSection
{
    root: IConfigurationSection;
}

export interface IConfigurationBuilder
{
    build(): IConfiguration;
}


export function parseKey(key: string): string[]
{
    return key.split('__');
}