import { ICollection, IEnumerable } from './Enumerables/_types';
import { IEvent } from './Events/_types';
import { IDisposable } from './Types';

export interface INotifyPropertyChangedEventArgs
{
    propertyName: string;
}

export interface INotifyPropertyChanged
{
    propertyChanged: IEvent<INotifyPropertyChangedEventArgs>;
}

export interface INotifyComponentPropertyChangedEventArgs extends INotifyPropertyChangedEventArgs
{
    instance: INotifyPropertyChanged;
}

export interface IComponent<P> extends INotifyPropertyChanged, IDisposable
{
    new(props: P, components?: ICollection<IComponent<any>>);
    components: IEnumerable<IComponent<any>>;
    propertyChanged: IEvent<INotifyComponentPropertyChangedEventArgs | INotifyPropertyChangedEventArgs>;

    init():void;
}