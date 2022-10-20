
export default class TimeSpan extends Number
{
    public static readonly second = 1000; // milliseconds
    public static readonly minute = 60 * TimeSpan.second;
    public static readonly hour = 60 * TimeSpan.minute;
    public static readonly day = 24 * TimeSpan.hour;
    public static readonly week = 7 * TimeSpan.day;

    public static readonly zero = new TimeSpan(0);
    public static readonly maxValue = new TimeSpan(Number.MAX_SAFE_INTEGER);
    public static readonly minValue = new TimeSpan(Number.MIN_SAFE_INTEGER);

    //#milliseconds = 0;

    constructor(milliseconds: Number)
    {
        super(milliseconds);
    }

    public get days(): number
    {
        return Math.trunc(this.totalDays);
    }

    public get hours(): number
    {
        return Math.trunc(this.totalHours) % 24;
    }

    public get milliseconds(): number
    {
        return Math.trunc(this.totalMilliseconds) % 1000;
    }

    public get minutes(): number
    {
        return Math.trunc(this.totalMinutes) % 60;
    }

    public get seconds(): number
    {
        return Math.trunc(this.totalSeconds) % 60;
    }

    public get totalDays(): number
    {
        return this.totalMilliseconds / TimeSpan.day;
    }

    public get totalHours(): number
    {
        return this.totalMilliseconds / TimeSpan.hour;
    }

    public get totalMinutes(): number
    {
        return this.totalMilliseconds / TimeSpan.minute;
    }

    public get totalSeconds(): number
    {
        return this.totalMilliseconds / TimeSpan.second;
    }

    public get totalMilliseconds(): number
    {
        return this.valueOf();
    }

    public add(ts: TimeSpan)
    {
        return new TimeSpan(this.valueOf() + ts.valueOf());
    }

    public static fromDays(value: number)
    {
        return new TimeSpan(value * TimeSpan.day);
    }

    public static fromHours(value: number)
    {
        return new TimeSpan(value * TimeSpan.hour);
    }

    public static fromMinutes(value: number)
    {
        return new TimeSpan(value * TimeSpan.minute);
    }

    public static fromSeconds(value: number)
    {
        return new TimeSpan(value * TimeSpan.second);
    }
}