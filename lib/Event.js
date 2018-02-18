"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exceptions_1 = require("./Exceptions");
/**
 * Class to represent an event.
 */
var Event = (function () {
    /**
     * Creates a new event
     */
    function Event() {
        this._eventHandlers = [];
    }
    /**
     * Invokes the event
     * @param sender the object that is calling invoke
     * @param args the arguments to send along with the event.
     */
    Event.prototype.invoke = function (sender, args) {
        for (var _i = 0, _a = this._eventHandlers; _i < _a.length; _i++) {
            var eventHandler = _a[_i];
            eventHandler.call(sender, sender, args);
        }
    };
    /**
     * Adds a handler to the event
     * @param eventHandler
     */
    Event.prototype.addHandler = function (eventHandler) {
        this._eventHandlers.push(eventHandler);
        return eventHandler;
    };
    /**
     * removes a handler from the event.
     * @param eventHandler
     */
    Event.prototype.removeHandler = function (eventHandler) {
        var index = this._eventHandlers.indexOf(eventHandler);
        if (index != -1) {
            this._eventHandlers.splice(index, 1);
        }
        else {
            throw new Exceptions_1.ArgumentException('eventHandler', "Handler is not in this Event");
        }
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map