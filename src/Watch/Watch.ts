import TimeSpan from '../Dates/TimeSpan.js';

function now()
{
    return performance.now();
}

export default class Watch
{
    #start: number;

    constructor()
    {
        this.#start = now();
    }

    /** Returns the number of days elapsed. */
    get days(): number
    {
        return this.milliseconds / TimeSpan.day;
    }
    /** Returns the number of hours elapsed. */
    get hours(): number
    {
        return this.milliseconds / TimeSpan.hour;
    }
    /** Returns the number of milliseconds elapsed. */
    get milliseconds(): number
    {
        return now() - this.#start;
    }

    /** Returns the number of minutes elapsed. */
    get minutes(): number
    {
        return this.milliseconds / TimeSpan.minute;
    }
    /** Returns the number of seconds elapsed. */
    get seconds(): number
    {
        return this.milliseconds / TimeSpan.second;
    }
}