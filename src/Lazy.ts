import { Undefinable } from "./Types";



export class Lazy<T>
{
    private readonly _factory: () => T;
    private _value: Undefinable<T>;

    constructor(factory: () => T)
    {
        this._factory = factory;
    }

    public get value(): T
    {
        return this._value || (this._value = this._factory());
    }

    public get isValueCreated(): boolean
    {
        return this._value !== undefined;
    }
}
