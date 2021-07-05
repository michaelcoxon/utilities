import FormatException from '../Exceptions/FormatException';
import Strings from '../Strings';
import { IFormatter, INumberFormatterConfiguration } from './_types';
import NumberFormatterDelegates from "./NumberFormatterDelegates";

/** Formats numbers */

export default  class NumberFormatter implements IFormatter<number>
{
    private static readonly DefaultConfiguration: INumberFormatterConfiguration = {
        currencyFormat: "{1}${0}",
        currencyDecimalDigits: 2,
        numberDecimalDigits: 2,
        percentDecimalDigits: 2,
    };

    private readonly _delegates: NumberFormatterDelegates;

    constructor(numberFormatterDelegates: NumberFormatterDelegates = new NumberFormatterDelegates(NumberFormatter.DefaultConfiguration))
    {
        this._delegates = numberFormatterDelegates;
    }

    public format(subject: number, format: string): string
    {
        if (Strings.isNullOrEmpty(format))
        {
            return subject.toString();
        }

        else
        {
            const [specifier, precision] = [format.charAt(0), parseInt(format.slice(1)) || undefined];
            return this._getFormatter(specifier).call(this._delegates, subject, precision);
        }
    }

    private _getFormatter(specifier): (subject: number, precision?: number) => string
    {
        switch (specifier.toLowerCase())
        {
            case 'c': return this._delegates.formatCurrency;
            case 'd': return this._delegates.formatDecimal;
            case 'e': return this._delegates.formatExponential;
            case 'f': return this._delegates.formatFixed;
            case 'g': return this._delegates.formatGeneral;
            case 'n': return this._delegates.formatNumber;
            case 'p': return this._delegates.formatPercent;
            case 'x': return this._delegates.formatHexadecimal;

            default: throw new FormatException(`The format specifier '${specifier}' is not implemented`);
        }
    }
}
