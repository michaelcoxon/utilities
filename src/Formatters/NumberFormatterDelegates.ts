import Strings from '../Strings';
import { INumberFormatterConfiguration } from './_types';


export default class NumberFormatterDelegates
{
    private readonly _config: INumberFormatterConfiguration;

    constructor(numberFormatterConfiguration: INumberFormatterConfiguration)
    {
        this._config = numberFormatterConfiguration;
    }

    public formatCurrency(subject: number, precision: number = this._config.currencyDecimalDigits): string
    {
        return Strings.format(this._config.currencyFormat, this.formatFixed(Math.abs(subject), precision), subject < 0 ? "-" : "");
    }

    public formatDecimal(subject: number, minDigits: number = 0): string
    {
        if (subject < 0)
        {
            return `-${Strings.padLeft(Math.abs(subject).toFixed(0), minDigits, "0")}`;
        }

        else
        {
            return Strings.padLeft(subject.toFixed(0), minDigits, "0");
        }
    }

    public formatExponential(subject: number, precision: number = 6): string
    {
        return subject.toExponential(precision);
    }

    public formatFixed(subject: number, precision: number = this._config.numberDecimalDigits): string
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

    public formatNumber(subject: number, precision: number = this._config.numberDecimalDigits): string
    {
        return this.formatFixed(subject, precision);
    }

    public formatPercent(subject: number, precision: number = this._config.percentDecimalDigits): string
    {
        return `${this.formatFixed(subject, precision)} %`;
    }

    public formatHexadecimal(subject: number, precision: number = 0): string
    {
        return Strings.padLeft(subject.toString(16), precision, "0");
    }
}
