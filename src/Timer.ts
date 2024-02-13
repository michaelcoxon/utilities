import Event from './Events/Event';
import { IEvent } from './Events/_types';
import ArgumentException from './Exceptions/ArgumentException';
import { IDisposable } from './Types';

declare function clearInterval(intervalId: unknown): void;
declare function setInterval(callback: (...args: unknown[]) => void, ms: number, ...args: unknown[]): unknown;

export default class Timer implements IDisposable
{
    #autoReset: boolean;
    #enabled: boolean;
    #interval: number;

    #intervalPointer?: unknown;

    readonly #elapsedEvent: Event<{ signalTime: number; }>;

    /** Initializes a new instance of the Timer class, and sets all the properties to their initial values. */
    constructor();
    /** Initializes a new instance of the Timer class, and sets the Interval property to the specified number of milliseconds. */
    constructor(interval: number);
    constructor(interval = 100)
    {
        if (interval < 0)
        {
            throw new ArgumentException("interval", "interval must be greater than 0");
        }

        interval = Math.ceil(interval);
        if (interval < 0)
        {
            throw new ArgumentException("interval", "interval must be greater than 0");
        }

        this.#autoReset = true;
        this.#enabled = false;
        this.#interval = Math.round(interval);

        this.#elapsedEvent = new Event();
    }

    get onElapsed(): IEvent<{ signalTime: number; }>
    {
        return this.#elapsedEvent;
    }

    /** Gets a Boolean indicating whether the Timer should raise the Elapsed event only once(false) or repeatedly(true). */
    get autoReset(): boolean
    {
        return this.#autoReset;
    }
    /** Sets a Boolean indicating whether the Timer should raise the Elapsed event only once(false) or repeatedly(true). */
    set autoReset(value: boolean)
    {
        this.#autoReset = value;
    }

    /** Gets a value indicating whether the Timer should raise the Elapsed event. */
    get enabled(): boolean
    {
        return this.#enabled;
    }
    /** Sets a value indicating whether the Timer should raise the Elapsed event. */
    set enabled(value: boolean)
    {
        // multiple call protection
        if (this.#enabled === value)
        {
            return;
        }
        
        this.#enabled = value;

        if (this.#enabled)
        {
            this.#createInterval();
        }
        else
        {
            this.#destroyInterval();
        }
    }   

    /** Gets the interval, expressed in milliseconds, at which to raise the Elapsed event. */
    get interval(): number
    {
        return this.#interval;
    }
    /** Sets the interval, expressed in milliseconds, at which to raise the Elapsed event. */
    set interval(value: number)
    {
        this.#interval = value;
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

    #createInterval()
    {
        this.#intervalPointer = setInterval(() =>
        {
            // has been disabled but the interval wasn't cancelled or, disable after this run
            if (!this.#enabled || !this.autoReset)
            {
                this.#destroyInterval();
                return;
            }

            // disable after this run
            if (!this.autoReset)
            {
                this.#enabled = false;
                this.#destroyInterval();
            }

            this.#elapsedEvent.invoke(this, { signalTime: Date.now() });

        }, this.interval);
    }

    #destroyInterval()
    {
        if (this.#intervalPointer !== undefined)
        {
            clearInterval(this.#intervalPointer);
            this.#intervalPointer = undefined;
        }
    }
}