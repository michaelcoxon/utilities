import FormatException from '../Exceptions/FormatException';
import { IFormatter, INumberFormatterConfiguration } from './_types';
import NumberFormatterDelegates from "./NumberFormatterDelegates";
import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty';

/** Formats numbers */

export default  class NumberFormatter implements IFormatter<number>
{
    private static readonly DefaultConfiguration: INumberFormatterConfiguration = {
        currencyFormat: "{1}${0}",
        currencyDecimalDigits: 2,
        numberDecimalDigits: 2,
        percentDecimalDigits: 2,
    };

    readonly #delegates: NumberFormatterDelegates;

    constructor(numberFormatterDelegates: NumberFormatterDelegates = new NumberFormatterDelegates(NumberFormatter.DefaultConfiguration))
    {
        this.#delegates = numberFormatterDelegates;
    }

    public format(subject: number, format: string): string
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

    readonly #getFormatter = (specifier:string) =>
    {
        switch (specifier.toLowerCase())
        {
            case 'c': return this.#delegates.formatCurrency;
            case 'd': return this.#delegates.formatDecimal;
            case 'e': return this.#delegates.formatExponential;
            case 'f': return this.#delegates.formatFixed;
            case 'g': return this.#delegates.formatGeneral;
            case 'n': return this.#delegates.formatNumber;
            case 'p': return this.#delegates.formatPercent;
            case 'x': return this.#delegates.formatHexadecimal;

            default: throw new FormatException(`The format specifier '${specifier}' is not implemented`);
        }
    }
}
