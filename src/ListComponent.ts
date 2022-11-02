
import Component from './Component';
import { List } from './Enumerables';

interface IListComponentProps
{
    items?: [];
    selectedIndex?: number;
    onSelectedIndexChanged?: (newIndex: number) => void;
}

class ListComponent extends Component<IListComponentProps>
{
    /**
     *
     */
    constructor(props: IListComponentProps)
    {
        super(props);
    }

    init(): void
    {
        super.init();
    }

    execute()
    {
        return new List(this.props.items);
    }
}