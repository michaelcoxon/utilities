import { KEY_WORD_SEPARATOR } from '../Strings/_consts.js';
import { ConfigValue } from './Json/Json.types.js';

export interface IConfigurationSection
{
    getSection(key: string): IConfigurationSection;
    get<T extends ConfigValue>(key?: string): T;
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