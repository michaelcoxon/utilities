import { IFormatter, IDateFormatterConfiguration } from '../_types';
import * as DefaultConfiguration from '../../i18n/en.DateFormatterConfiguration.strings.json';
import TOKEN_TO_STRING_DELEGATES from './TOKEN_TO_STRING_DELEGATES';


export default class DateFormatter implements IFormatter<Date>
{
    readonly #config: IDateFormatterConfiguration;

    constructor(dateFormatterConfiguration: IDateFormatterConfiguration = DefaultConfiguration)
    {
        this.#config = dateFormatterConfiguration;
    }

    public format(subject: Date, format: string): string
    {
        const tokens = Object.keys(TOKEN_TO_STRING_DELEGATES);

        const matcher = /([a-z]+)/ig;

        const result = format.replace(matcher, (token: string) =>
        {
            if (tokens.indexOf(token) > -1)
            {
                return TOKEN_TO_STRING_DELEGATES[token](subject, this.#config);
            }
            return token;
        });

        return result;
    }
}
