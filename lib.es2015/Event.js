"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("./Exceptions");
/**
 * Class to represent an event.
 */
class Event {
    /**
     * Creates a new event
     */
    constructor() {
        this._eventHandlers = [];
    }
    /**
     * Invokes the event
     * @param sender the object that is calling invoke
     * @param args the arguments to send along with the event.
     */
    invoke(sender, args) {
        for (let eventHandler of this._eventHandlers) {
            eventHandler.call(sender, sender, args);
        }
    }
    /**
     * Adds a handler to the event
     * @param eventHandler
     */
    addHandler(eventHandler) {
        this._eventHandlers.push(eventHandler);
        return eventHandler;
    }
    /**
     * removes a handler from the event.
     * @param eventHandler
     */
    removeHandler(eventHandler) {
        var index = this._eventHandlers.indexOf(eventHandler);
        if (index != -1) {
            this._eventHandlers.splice(index, 1);
        }
        else {
            throw new Exceptions_1.ArgumentException('eventHandler', "Handler is not in this Event");
        }
    }
}
exports.Event = Event;
//# sourceMappingURL=Event.js.map