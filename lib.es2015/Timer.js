"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("./Event");
const Exceptions_1 = require("./Exceptions");
class Timer {
    constructor(interval = 100) {
        if (interval <= 0) {
            throw new Exceptions_1.ArgumentException("interval", "interval must be greater than 0");
        }
        interval = Math.ceil(interval);
        if (interval <= 0) {
            throw new Exceptions_1.ArgumentException("interval", "interval must not round to be 0 or less");
        }
        this._autoReset = true;
        this._enabled = false;
        this._interval = Math.ceil(interval);
        this._elapsedEvent = new Event_1.Event();
    }
    get onElapsed() {
        return this._elapsedEvent;
    }
    /** Gets a Boolean indicating whether the Timer should raise the Elapsed event only once(false) or repeatedly(true). */
    get autoReset() {
        return this._autoReset;
    }
    /** Sets a Boolean indicating whether the Timer should raise the Elapsed event only once(false) or repeatedly(true). */
    set autoReset(value) {
        this._autoReset = value;
    }
    /** Gets a value indicating whether the Timer should raise the Elapsed event. */
    get enabled() {
        return this._enabled;
    }
    /** Sets a value indicating whether the Timer should raise the Elapsed event. */
    set enabled(value) {
        this._enabled = value;
        if (value) {
            this._intervalPointer = setInterval(() => {
                if (!this.autoReset) {
                    this.enabled = false;
                }
                this._elapsedEvent.invoke(this, { signalTime: new Date() });
            }, this.interval);
        }
        else {
            if (this._intervalPointer !== undefined) {
                clearInterval(this._intervalPointer);
                this._intervalPointer = undefined;
            }
        }
    }
    /** Gets the interval, expressed in milliseconds, at which to raise the Elapsed event. */
    get interval() {
        return this._interval;
    }
    /** Sets the interval, expressed in milliseconds, at which to raise the Elapsed event. */
    set interval(value) {
        this._interval = value;
    }
    /** Starts raising the Elapsed event by setting Enabled to true. */
    start() {
        this.enabled = true;
    }
    /** Stops raising the Elapsed event by setting Enabled to false. */
    stop() {
        this.enabled = false;
    }
    dispose() {
        this.stop();
    }
}
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map