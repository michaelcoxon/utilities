import FormatException from '../Exceptions/FormatException';
import { IFormatter } from './_types';
import NumberFormatterDelegates from "./NumberFormatterDelegates";
import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty';
import * as DefaultConfiguration from '../i18n/en/NumberFormatterConfiguration.strings.json';

/** Formats numbers */

export default class NumberFormatter implements IFormatter<number>
{
    readonly #delegates: NumberFormatterDelegates;

    constructor(numberFormatterDelegates: NumberFormatterDelegates = new NumberFormatterDelegates(DefaultConfiguration))
    {
        this.#delegates = numberFormatterDelegates;
    }

    public format(subject: number, format?: string): string
    {
        if (isNullOrEmpty(format))
        {
            return subject.toString();
        }

        else
        {
            const [specifier, precision] = [format.charAt(0), parseInt(format.slice(1)) || undefined];
            return this.#getFormatter(specifier).call(this.#delegates, subject, precision);
        }
    }

    readonly #getFormatter = (specifier: string): (subject: number, precision?: number) => string =>
    {
        switch (specifier.toLowerCase())
        {
            case 'c': return this.#delegates.formatCurrency;
            case 'd': return this.#delegates.formatInteger;
            case 'e': return this.#delegates.formatExponential;
            case 'f': return this.#delegates.formatFixed;
            case 'g': return this.#delegates.formatGeneral;
            case 'n': return this.#delegates.formatNumber;
            case 'p': return this.#delegates.formatPercent;
            case 'x': return this.#delegates.formatHexadecimal;

            default: throw new FormatException(`The format specifier '${specifier}' is not implemented`);
        }
    };
}
