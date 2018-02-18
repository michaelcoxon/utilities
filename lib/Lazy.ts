


export class Lazy<T>
{
    private readonly _factory: () => T;
    private _value?: T;

    constructor(factory: () => T)
    {
        this._factory = factory;
    }

    public get value(): T
    {
        return this._value || (this._value = this._factory());
    }
}
