




export default function remove<T>(array: T[], item: T): boolean
{
    const index = array.indexOf(item);

    if (index != undefined)
    {
        array.splice(index, 1);
        return true;
    }
    else
    {
        return false;
    }
}