import { IDisposable, Undefinable } from './Types.js';
import { IEnumerable } from './Enumerables/_types.js';
import Event from './Events/Event.js';
import { IEvent } from './Events/_types.js';
import { INotifyPropertyChanged, INotifyComponentPropertyChangedEventArgs, INotifyPropertyChangedEventArgs } from './INotifyPropertyChanged.js';
import { Collection, Enumerable } from './Enumerables/index.js';

type Props = Undefinable<{}>;

export interface IComponent<TProps extends Props = undefined> extends INotifyPropertyChanged, IDisposable
{
    readonly props: TProps;
    readonly components: IEnumerable<IComponent>;
    readonly propertyChanged: IEvent<INotifyComponentPropertyChangedEventArgs | INotifyPropertyChangedEventArgs>;

    init(): void;
}

export default abstract class Component<TProps extends Props> implements IComponent<TProps>
{
    #components: IEnumerable<IComponent<undefined>>;
    #disposed = false;
    #initialised = false;
    #propertyChanged = new Event<INotifyComponentPropertyChangedEventArgs | INotifyPropertyChangedEventArgs>;
    #props: TProps;

    constructor(props: TProps, components?: IEnumerable<IComponent>)
    {
        this.#props = props;
        this.#components = components ?? Enumerable.empty();
    }

    get components(): IEnumerable<IComponent<undefined>>
    {
        return this.#components;
    }

    get propertyChanged(): IEvent<INotifyComponentPropertyChangedEventArgs | INotifyPropertyChangedEventArgs>
    {
        return this.#propertyChanged;
    }

    get props(): TProps
    {
        return this.#props;
    }

    init(): void
    {
        if (!this.#initialised)
        {
            this.#initialised = true;

            // realise the child components
            this.#components = new Collection(this.#components.toArray());
            // subscribe to their changes
            for (const component of this.#components)
            {
                component.propertyChanged.addHandler((s, e) =>
                {
                    this.#propertyChanged.invoke(this, { ...e, instance: s });
                });
                component.init();
            }
        }
    }

    dispose(): void
    {
        if (!this.#disposed)
        {
            this.#disposed = true;
            this.#propertyChanged.dispose();

            for (const component of this.components)
            {
                component.dispose();
            }
        }
    }
}