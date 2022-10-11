import { Undefinable } from "../Types";
import BaseModelState from './BaseModelState';

/**
 * Interface for implementing your own state
 */
export interface IModelState<T>
{
    subscribe(postCallback: (value: Undefinable<T>) => void, preCallback?: (value: Undefinable<T>) => void): string;
    unsubscribe(key: string): void;
    toString(): string;
    readonly value: Undefinable<T>;
    valueOf(): Undefinable<T>;
}

/** Provides a mutatable state that can update registered components to the state */
export default class ModelState<T> extends BaseModelState<T> implements IModelState<T>
{
    /** Creates a new ModelState */
    constructor();
    /**
     * Creates a new ModelState
     * 
     * @param initialValue The initial value of the state
     */
    constructor(initialValue: T);
    constructor(initialValue?: T)
    {
        super(initialValue);
    }

    /** Gets the current value of the ModelState */
    public get value(): Undefinable<T>
    {
        return this.getValue();
    }

    /** Sets the current value of the ModelState and invokes all subscriptions */
    public set value(value: Undefinable<T>)
    {
        this.setValue(value);
    }
}

