
import Component from './Component';

interface IListComponentProps
{
    items?: [];
    selectedIndex?: number;
    onSelectedIndexChanged?: (newIndex: number) => void;
}

export default class ListComponent extends Component<IListComponentProps>
{
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
        return [
            this.executeHeader(),
            this.props.items?.map(i => this.executeItem(i)),
            this.executeFooter()
        ];
    }

    protected executeHeader()
    {
        return "Header";
    }
    protected executeItem(item)
    {
        return item;
    }
    protected executeFooter()
    {
        return "Footer";

    }


}