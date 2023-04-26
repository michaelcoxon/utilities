import DefaultComparers from "../Comparers/DefaultComparers";
import equivilentToByJSON from '../Utilities/equivilentToByJSON';
import { IComparer } from '../Comparers/_types';
import { IEnumerable, IList, ICollection } from './_types';
import Collection from './Collection';
import asArray from './utils/asArray';


export default class List<T> extends Collection<T> implements IList<T>, ICollection<T>, IEnumerable<T>
{
    public addRange(iterable: Iterable<T>): void
    {
        const array = asArray<T>(iterable);
        this._array = this._array.concat(array);
    }

    public find(obj: T, isEquivilent = false): T | undefined
    {
        if (isEquivilent)
        {
            for (const item of this._array)
            {
                if (equivilentToByJSON(item, obj))
                {
                    return item;
                }
            }
        }

        else
        {
            const index = this.indexOf(obj);
            if (index !== undefined)
            {
                return this.item(index);
            }

            else
            {
                return undefined;
            }
        }
    }

    public indexOf(value: T, isEquivilent = false): number | undefined
    {
        if (isEquivilent)
        {
            let index: number | undefined;

            this.forEach((item, i) =>
            {
                if (equivilentToByJSON(item, value))
                {
                    index = i;
                    return false;
                }
            });

            return index;
        }

        else
        {
            const index = this._array.indexOf(value);
            if (index == -1)
            {
                return undefined;
            }
            return index;
        }
    }

    public insert(obj: T, index: number): void
    {
        this._array.splice(index, 0, obj);
    }

    public prepend(obj: T): IEnumerable<T>
    {
        this.insert(obj, 0);
        return this;
    }

    public prependRange(iterable: Iterable<T>): void
    {
        const array = asArray<T>(iterable);
        this._array.splice(0, 0, ...array);
    }

    public removeAt(index: number): void
    {
        this._array.splice(index, 1);
    }

    public sort(comparer: IComparer<T> = DefaultComparers.DefaultComparer): void
    {
        this._array.sort((a, b) => comparer.compare(a, b));
    }
}
