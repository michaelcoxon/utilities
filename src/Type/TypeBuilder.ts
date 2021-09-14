import Type, { IType } from "./Type";
import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty';
import NullReferenceException from '../Exceptions/NullReferenceException';
export default class TypeBuilder
{
    #name = '';
    #namespace = '';
    #baseType: IType = Type.getType(undefined);
    #isArray = false;
    #factory: (...args: unknown[]) => unknown = () => undefined;

    public build(): IType
    {
        if(isNullOrEmpty(this.#name))
        {
            throw new NullReferenceException();
        }

        const type = {
            fullName: isNullOrEmpty(this.#namespace) ? this.#name : `${this.#namespace}.${this.#name}`,
            name: this.#name,
            namespace: this.#namespace,
            baseType: this.#baseType,
            isArray: this.#isArray,
            factory: this.#factory
        } as IType;
        Object.seal(type);
        return type;
    }

    public setName: (name: string) => this = name =>
    {
        this.#name = name;
        return this;
    };
    public setNamespace: (namespace: string) => this = namespace =>
    {
        this.#namespace = namespace;
        return this;
    };
    public deriveFrom: (type: IType) => this = type =>
    {
        this.#baseType = type;
        return this;
    };
    public factory?: (constructor: new <T, TArgs = keyof T>(...args: TArgs[]) => T) => this = constructor =>
    {
        this.#factory = (...args) => new constructor(...args);
        return this;
    };
}