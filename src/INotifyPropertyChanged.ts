import { IEvent } from './Events/_types.js';

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