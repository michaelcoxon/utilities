import format from '../Strings/format.js';
import padLeft from '../Strings/padLeft.js';
import { INumberFormatterConfiguration } from './_types.js';


export default class NumberFormatterDelegates
{
    readonly #config: INumberFormatterConfiguration;

    constructor(numberFormatterConfiguration: INumberFormatterConfiguration)
    {
        this.#config = numberFormatterConfiguration;
    }

    public formatCurrency(subject: number, precision: number = this.#config.currencyDecimalDigits): string
    {
        return format(this.#config.currencyFormat, this.formatFixed(Math.abs(subject), precision), subject < 0 ? "-" : "");
    }

    public formatInteger(subject: number, minDigits = 0): string
    {
        if (subject < 0)
        {
            return `-${padLeft(Math.abs(subject).toFixed(0), minDigits, "0")}`;
        }

        else
        {
            return padLeft(subject.toFixed(0), minDigits, "0");
        }
    }

    public formatExponential(subject: number, precision = 6): string
    {
        return subject.toExponential(precision);
    }

    public formatFixed(subject: number, precision: number = this.#config.numberDecimalDigits): string
    {
        return subject.toFixed(precision);
    }

    public formatGeneral(subject: number, precision?: number): string
    {
        const fixed = this.formatFixed(subject, precision);
        const expon = this.formatExponential(subject, precision);

        return fixed.length <= expon.length
            ? fixed
            : expon;
    }

    public formatNumber(subject: number, precision: number = this.#config.numberDecimalDigits): string
    {
        return this.formatFixed(subject, precision);
    }

    public formatPercent(subject: number, precision: number = this.#config.percentDecimalDigits): string
    {
        return `${this.formatFixed(subject, precision)} %`;
    }

    public formatHexadecimal(subject: number, precision = 0): string
    {
        return padLeft(subject.toString(16), precision, "0");
    }
}
