import Type, { IType } from "./Type";
import Strings from '../Strings';
import { Ensure } from '@michaelcoxon/ensure';
export default class TypeBuilder
{
    private _name: string = '';
    private _namespace: string = '';
    private _baseType: IType = Type.getType(undefined);
    private _isArray: boolean = false;
    private _factory: (...args: any[]) => any = () => undefined;

    public build(): IType
    {
        Ensure.arg(this._name, 'name').isNotNullOrUndefinedOrEmpty();

        var type = {
            fullName: Strings.isNullOrEmpty(this._namespace) ? this._name : `${this._namespace}.${this._name}`,
            name: this._name,
            namespace: this._namespace,
            baseType: this._baseType,
            isArray: this._isArray,
            factory: this._factory
        } as IType;
        Object.seal(type);
        return type;
    }

    public setName: (name: string) => this = name =>
    {
        this._name = name;
        return this;
    };
    public setNamespace: (namespace: string) => this = namespace =>
    {
        this._namespace = namespace;
        return this;
    };
    public deriveFrom: (type: IType) => this = type =>
    {
        this._baseType = type;
        return this;
    };
    public factory?: (constructor: new <T, TArgs = keyof T>(...args: TArgs[]) => T) => this = constructor =>
    {
        this._factory = (...args) => new constructor(...args);
        return this;
    };
}