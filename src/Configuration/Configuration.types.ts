import { KEY_WORD_SEPARATOR } from '../Strings/_consts';

export interface IConfigurationSection
{
    getSection(key: string): IConfigurationSection;
    get<T = Record<string,unknown>>(key?: string): T;
}

export interface IConfiguration extends IConfigurationSection
{
    root: IConfigurationSection;
}

export interface IConfigurationBuilder
{
    build(reload?:boolean): IConfiguration;
}


export function parseKey(key: string): string[]
{
    return key.split(KEY_WORD_SEPARATOR);
}