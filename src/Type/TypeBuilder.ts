import { Type } from "./Type";


export class TypeBuilder
{
    public build(): Type
    {
        var type = {
            fullName: this.fullName,
            name: this.name,
            namespace: this.namespace,
            baseType: this.baseType,
            isArray: this.isArray,
            factory: this.factory
        } as Type;
        Object.seal(type);
        return type;
    }

    public fullName?: string;
    public name?: string;
    public namespace?: string;
    public baseType?: Type;
    public isArray?: boolean;
    public factory?: (...args: any[]) => any;
}