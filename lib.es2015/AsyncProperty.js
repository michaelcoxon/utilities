"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Event_1 = require("./Event");
const Exceptions_1 = require("./Exceptions");
class AsyncProperty {
    constructor(getAsync, setAsync, updateNow = true) {
        this._getAsync = getAsync;
        this._setAsync = setAsync;
        this._value = undefined;
        this._preHandlers = {};
        this._postHandlers = {};
        this._updatedEvent = new Event_1.Event();
        this._updatingEvent = new Event_1.Event();
        this._updater = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._onUpdating();
            this._value = yield this._getAsync();
            this._onUpdated();
        });
        if (updateNow) {
            this._updater();
        }
    }
    /**
     * Creates a subscription to the ModelState that will be called when
     * the state is updated.
     *
     * @param callback The callback to be invoked when the state is updated
     * @returns A symbol that must saved to unsubscribe from the ModelState
     */
    subscribe(postCallback, preCallback) {
        const key = Symbol();
        const postHandler = (s, e) => postCallback(e);
        this._postHandlers[Symbol.keyFor(key)] = postHandler;
        this._updatedEvent.addHandler(postHandler);
        if (preCallback) {
            const preHandler = (s, e) => preCallback(e);
            this._preHandlers[Symbol.keyFor(key)] = preHandler;
            this._updatingEvent.addHandler(preHandler);
        }
        postCallback(this.value);
        return key;
    }
    /**
     * Unsubscribes a component from the model state.
     *
     * @param key The symbol that was returned from the subscribe method.
     */
    unsubscribe(key) {
        const postHandler = this._postHandlers[Symbol.keyFor(key)];
        if (postHandler) {
            this._updatedEvent.removeHandler(postHandler);
            delete this._postHandlers[Symbol.keyFor(key)];
        }
        const preHandler = this._preHandlers[Symbol.keyFor(key)];
        if (preHandler) {
            this._updatingEvent.removeHandler(preHandler);
            delete this._preHandlers[Symbol.keyFor(key)];
        }
    }
    /** Gets the current value of the ModelState */
    get value() {
        if (this._value === undefined) {
            throw new Exceptions_1.NullReferenceException("value is undefined");
        }
        return this._value;
    }
    set value(value) {
        this._value = value;
        this._setAsync(value);
    }
    /** Returns the current value of the ModelState */
    valueOf() {
        return this._value;
    }
    /** Returns the string version of the ModelState value */
    toString() {
        return this._value.toString();
    }
    update() {
        this._updater();
    }
    /** Invokes the subscriptions with the current value */
    _onUpdated() {
        this._updatedEvent.invoke(this, this.value);
    }
    _onUpdating() {
        this._updatingEvent.invoke(this, this.value);
    }
}
//# sourceMappingURL=AsyncProperty.js.map