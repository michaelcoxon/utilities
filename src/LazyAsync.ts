import { Undefinable } from "./Types";

export class LazyAsync<T>
{
    private readonly _factory: () => Promise<T>;
    private _value: Undefinable<T>;

    constructor(factory: () => Promise<T>)
    {
        this._factory = factory;
    }

    public get value(): Promise<T>
    {
        return new Promise<T>(async (resolve, reject) =>
        {
            if (this._value !== undefined)
            {
                resolve(this._value);
            }
            else
            {
                try
                {
                    resolve(await this._factory());
                }
                catch (ex)
                {
                    reject(ex);
                }
            }
        });
    }

    public get isValueCreated(): boolean
    {
        return this._value !== undefined;
    }
}