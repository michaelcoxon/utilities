"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("./Event");
/**
 * An event type that can only be invoked once. Once the event
 * is invoked, and handler that is added to it will be immediately
 * executed. All subsequent invocations are ignored
 */
class SingleInvokeEvent extends Event_1.Event {
    /**
     * Create a new singly invokable event.
     */
    constructor() {
        super();
        this._fired = false;
    }
    // Add a handler to the event
    addHandler(eventHandler) {
        super.addHandler(eventHandler);
        if (this._fired) {
            eventHandler.call(this._sender, this._sender, this._args);
        }
        return eventHandler;
    }
    // invoke the event
    invoke(sender, args) {
        /// <signature>
        /// <summary>Invoke the event handlers</summary>
        /// <param type='Object' name='sender'>The object that raised/owns the event</param>
        /// <param type='Object' name='sender'>Any to be passed as arguments to the handlers</param>
        /// </signature>
        if (this._fired) {
            return;
        }
        this._fired = true;
        this._sender = sender;
        this._args = args;
        super.invoke(sender, args);
    }
}
exports.SingleInvokeEvent = SingleInvokeEvent;
//# sourceMappingURL=SingleInvokeEvent.js.map