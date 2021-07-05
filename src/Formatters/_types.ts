
export interface IDateFormatterConfiguration
{
    am: string,
    pm: string;
    timeSeparator: string;
    dateSeparator: string;
    months_Long: string[];
    months_Short: string[];
    daysOfWeek_Long: string[];
    daysOfWeek_Short: string[];
}

export interface INumberFormatterConfiguration
{
    currencyFormat: string;
    currencyDecimalDigits: number;
    numberDecimalDigits: number;
    percentDecimalDigits: number;
}

export interface IFormatter<T>
{
    format(subject: T, format: string): string;
}


