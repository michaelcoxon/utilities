"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("tslib");
const Event_1 = require("./Event");
const CancellablePromise_1 = require("./CancellablePromise");
const Guid_1 = require("./Guid");
class BaseModelState {
    constructor(value) {
        this._value = value;
        this._preHandlers = {};
        this._postHandlers = {};
        this._updatedEvent = new Event_1.Event();
        this._updatingEvent = new Event_1.Event();
    }
    /**
     * Creates a subscription to the ModelState that will be called when
     * the state is updated.
     *
     * @param callback The callback to be invoked when the state is updated
     * @returns A symbol that must saved to unsubscribe from the ModelState
     */
    subscribe(postCallback, preCallback) {
        return this.subscribeCore(postCallback, preCallback, true);
    }
    /**
     * Unsubscribes a component from the model state.
     *
     * @param key The symbol that was returned from the subscribe method.
     */
    unsubscribe(key) {
        const postHandler = this._postHandlers[key];
        if (postHandler) {
            this._updatedEvent.removeHandler(postHandler);
            delete this._postHandlers[key];
        }
        const preHandler = this._preHandlers[key];
        if (preHandler) {
            this._updatingEvent.removeHandler(preHandler);
            delete this._preHandlers[key];
        }
    }
    /** Gets the current value of the ModelState */
    get value() {
        return this._value;
    }
    /** Returns the current value of the ModelState */
    valueOf() {
        return this._value;
    }
    /** Returns the string version of the ModelState value */
    toString() {
        return this._value.toString();
    }
    subscribeCore(postCallback, preCallback, publishCurrentValue = true) {
        const key = Guid_1.Guid.newGuid().toString();
        const postHandler = (s, e) => postCallback(e);
        this._postHandlers[key] = postHandler;
        this._updatedEvent.addHandler(postHandler);
        if (preCallback) {
            const preHandler = (s, e) => preCallback(e);
            this._preHandlers[key] = preHandler;
            this._updatingEvent.addHandler(preHandler);
        }
        if (publishCurrentValue) {
            postCallback(this._value);
        }
        return key;
    }
    getValue() {
        return this._value;
    }
    setValue(value) {
        this._onUpdating();
        this._value = value;
        this._onUpdated();
    }
    /** Invokes the subscriptions with the current value */
    _onUpdated() {
        this._updatedEvent.invoke(this, this._value);
    }
    _onUpdating() {
        this._updatingEvent.invoke(this, this._value);
    }
}
exports.BaseModelState = BaseModelState;
/** Provides a mutatable state that can update registered components to the state */
class ModelState extends BaseModelState {
    constructor(initialValue) {
        super(initialValue);
    }
    /** Gets the current value of the ModelState */
    get value() {
        return this.getValue();
    }
    /** Sets the current value of the ModelState and invokes all subscriptions */
    set value(value) {
        this.setValue(value);
    }
}
exports.ModelState = ModelState;
class PollingModelState extends BaseModelState {
    constructor(promiseOrValueFactory, timeout) {
        super();
        const worker = (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.setValue(yield promiseOrValueFactory());
            this._timeout = setTimeout(worker, timeout);
        })).bind(this);
        worker();
    }
    dispose() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }
}
exports.PollingModelState = PollingModelState;
class FactoryModelState extends BaseModelState {
    constructor(promiseOrValueFactory, updateNow = true) {
        super();
        this._updater = (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.setValue(yield promiseOrValueFactory());
        })).bind(this);
        if (updateNow) {
            this.update();
        }
    }
    subscribe(postCallback, preCallback) {
        const key = super.subscribeCore(postCallback, preCallback, false);
        if (this._currentPromise) {
            this._waitForPromise(() => postCallback(this.value));
        }
        else {
            postCallback(this.value);
        }
        return key;
    }
    /** Gets the current value of the ModelState */
    get value() {
        return this.getValue();
    }
    set value(value) {
        this.setValue(value);
    }
    update() {
        if (this._currentPromise) {
            this._currentPromise.cancel();
        }
        this._currentPromise = new CancellablePromise_1.CancellablePromise(this._updater());
    }
    _waitForPromise(then) {
        this._currentPromise
            .then(then)
            .finally((promise, cancelled) => {
            if (cancelled) {
                this._waitForPromise(then);
            }
        });
    }
}
exports.FactoryModelState = FactoryModelState;
//# sourceMappingURL=ModelState.js.map