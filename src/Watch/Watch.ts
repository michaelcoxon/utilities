import { day, hour, minute, second } from '../Dates';


export default class Watch
{
    #start: number;

    constructor()
    {
        this.#start = Date.now();
    }

    /** Returns the number of days elapsed. */
    get days(): number
    {
        return this.milliseconds / day;
    }
    /** Returns the number of hours elapsed. */
    get hours(): number
    {
        return this.milliseconds / hour;
    }
    /** Returns the number of milliseconds elapsed. */
    get milliseconds(): number
    {
        return Date.now() - this.#start;
    }
    /** Returns the number of minutes elapsed. */
    get minutes(): number
    {
        return this.milliseconds / minute;
    }
    /** Returns the number of seconds elapsed. */
    get seconds(): number
    {
        return this.milliseconds / second;
    }
}