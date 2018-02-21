"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("./Event");
/**
 * An event type that can only be invoked once. Once the event
 * is invoked, and handler that is added to it will be immediately
 * executed.
 */
var SingleInvokeEvent = /** @class */ (function (_super) {
    __extends(SingleInvokeEvent, _super);
    /**
     * Create a new singly invokable event.
     */
    function SingleInvokeEvent() {
        var _this = _super.call(this) || this;
        _this._fired = false;
        return _this;
    }
    // Add a handler to the event
    SingleInvokeEvent.prototype.addHandler = function (eventHandler) {
        _super.prototype.addHandler.call(this, eventHandler);
        if (this._fired) {
            eventHandler.call(this._sender, this._sender, this._args);
        }
        return eventHandler;
    };
    // invoke the event
    SingleInvokeEvent.prototype.invoke = function (sender, args) {
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
        _super.prototype.invoke.call(this, sender, args);
    };
    return SingleInvokeEvent;
}(Event_1.Event));
exports.SingleInvokeEvent = SingleInvokeEvent;
//# sourceMappingURL=SingleInvokeEvent.js.map