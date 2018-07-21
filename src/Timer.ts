import { Event, IEvent } from './Event';
import { ArgumentException } from './Exceptions';
import { IDisposable } from './IDisposable';

declare function clearInterval(intervalId: any): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;

export class Timer implements IDisposable
{
    private _autoReset: boolean;
    private _enabled: boolean;
    private _interval: number;

    private _intervalPointer?: any;

    private readonly _elapsedEvent: Event<{ signalTime: Date }>;

    /** Initializes a new instance of the Timer class, and sets all the properties to their initial values. */
    constructor();
    /** Initializes a new instance of the Timer class, and sets the Interval property to the specified number of milliseconds. */
    constructor(interval: number);
    constructor(interval: number = 100)
    {
        if (interval <= 0)
        {
            throw new ArgumentException("interval", "interval must be greater than 0");
        }

        interval = Math.ceil(interval);
        if (interval <= 0)
        {
            throw new ArgumentException("interval", "interval must not round to be 0 or less");
        }

        this._autoReset = true;
        this._enabled = false;
        this._interval = Math.ceil(interval);

        this._elapsedEvent = new Event();
    }

    get onElapsed(): IEvent<{ signalTime: Date }>
    {
        return this._elapsedEvent;
    }

    /** Gets a Boolean indicating whether the Timer should raise the Elapsed event only once(false) or repeatedly(true). */
    get autoReset(): boolean
    {
        return this._autoReset;
    }
    /** Sets a Boolean indicating whether the Timer should raise the Elapsed event only once(false) or repeatedly(true). */
    set autoReset(value: boolean)
    {
        this._autoReset = value;
    }

    /** Gets a value indicating whether the Timer should raise the Elapsed event. */
    get enabled(): boolean
    {
        return this._enabled;
    }
    /** Sets a value indicating whether the Timer should raise the Elapsed event. */
    set enabled(value: boolean)
    {
        this._enabled = value;

        if (value)
        {
            this._intervalPointer = setInterval(() =>
            {
                if (!this.autoReset)
                {
                    this.enabled = false;
                }

                this._elapsedEvent.invoke(this, { signalTime: new Date() });

            }, this.interval);
        }
        else
        {
            if (this._intervalPointer !== undefined)
            {
                clearInterval(this._intervalPointer);
                this._intervalPointer = undefined;
            }
        }
    }

    /** Gets the interval, expressed in milliseconds, at which to raise the Elapsed event. */
    get interval(): number
    {
        return this._interval;
    }
    /** Sets the interval, expressed in milliseconds, at which to raise the Elapsed event. */
    set interval(value: number)
    {
        this._interval = value;
    }

    /** Starts raising the Elapsed event by setting Enabled to true. */
    public start(): void
    {
        this.enabled = true;
    }

    /** Stops raising the Elapsed event by setting Enabled to false. */
    public stop(): void
    {
        this.enabled = false;
    }

    public dispose()
    {
        this.stop();
    }

}