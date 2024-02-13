import QueryStringCollection from "./QueryStringCollection";

describe('QueryStringCollection.constructor', () =>
{
    it('constructs', () =>
    {
        new QueryStringCollection();
    });
});

describe('QueryStringCollection.createFromQueryString', () =>
{
    it('constructs', () =>
    {
        new QueryStringCollection();
    });

    it('with question mark', () =>
    {
        const name = "myparam";
        const value = "myvalue";
        const queryString = `?${name}=${encodeURIComponent(value)}`;

        const query = QueryStringCollection.createFromQueryString(queryString);

        const str = query.toString();
        const obj = query.toObject();
        const items = query.items;

        expect(str).toEqual(queryString);

        expect(obj[name]).toEqual(value);
        expect(items[0].name).toEqual(name);
        expect(items[0].value).toEqual(value);
        expect(query.item(name)).toEqual(value);
    });

    it('without question mark', () =>
    {
        const name = "myparam";
        const value = "myvalue";
        const queryString = `${name}=${encodeURIComponent(value)}`;

        const query = QueryStringCollection.createFromQueryString(queryString);

        const str = query.toString();
        const obj = query.toObject();
        const items = query.items;

        expect(str).toEqual('?' + queryString);

        expect(obj[name]).toEqual(value);
        expect(items[0].name).toEqual(name);
        expect(items[0].value).toEqual(value);
        expect(query.item(name)).toEqual(value);
    });


    it('array', () =>
    {
        const name = "myparam";
        const value = "myvalue";
        const queryString = `${name}[]=${encodeURIComponent(value + 1)}&${name}[]=${encodeURIComponent(value + 2)}&${name}[]=${encodeURIComponent(value + 3)}`;

        const query = QueryStringCollection.createFromQueryString(queryString);

        const str = query.toString();
        const obj = query.toObject();
        const items = query.items;

        expect(str).toEqual('?' + queryString);

        expect(obj[name]![0]).toEqual(value + 1);
        expect(obj[name]![1]).toEqual(value + 2);
        expect(obj[name]![2]).toEqual(value + 3);
        expect(items[0].name).toEqual(name + '[]');
        expect(items[0].value).toEqual(value + 1);
        expect(query.item(name)).toEqual(undefined);
        expect(query.item(name + '[]')![0]).toEqual(value + 1);
        expect(query.item(name + '[]')![1]).toEqual(value + 2);
        expect(query.item(name + '[]')![2]).toEqual(value + 3);
    });

    it('object', () =>
    {
        const name = "myparam";
        const value = "myvalue";
        const queryString = `${name}.${name}=${encodeURIComponent(value)}`;

        const query = QueryStringCollection.createFromQueryString(queryString);

        const str = query.toString();
        const obj = query.toObject();
        const items = query.items;

        expect(str).toEqual('?' + queryString);

        expect(obj[name]![name]).toEqual(value);
        expect(items[0].name).toEqual(`${name}.${name}`);
        expect(items[0].value).toEqual(value);
        expect(query.item(`${name}.${name}`)).toEqual(value);
    });
});

describe('QueryStringCollection.createFromObject', () =>
{
    it('simple', () =>
    {
        const name = "myparam";
        const value = "myvalue";
        const queryString = `${name}=${encodeURIComponent(value)}`;

        const query = QueryStringCollection.createFromObject({ myparam: value });

        const str = query.toString();
        const obj = query.toObject();
        const items = query.items;

        expect(str).toEqual('?' + queryString);

        expect(obj[name]).toEqual(value);
        expect(items[0].name).toEqual(name);
        expect(items[0].value).toEqual(value);
        expect(query.item(name)).toEqual(value);
    });


    it('array', () =>
    {
        const name = "myparam";
        const value = "myvalue";
        const queryString = `${name}[0]=${encodeURIComponent(value + 1)}&${name}[1]=${encodeURIComponent(value + 2)}&${name}[2]=${encodeURIComponent(value + 3)}`;

        const query = QueryStringCollection.createFromObject({ myparam: [value + 1, value + 2, value + 3] });

        const str = query.toString();
        const obj = query.toObject();
        const items = query.items;

        expect(str).toEqual('?' + queryString);

        expect(obj[name]![0]).toEqual(value + 1);
        expect(obj[name]![1]).toEqual(value + 2);
        expect(obj[name]![2]).toEqual(value + 3);
        expect(items[0].name).toEqual(name + '[0]');
        expect(items[0].value).toEqual(value + 1);
        expect(query.item(name)).toEqual(undefined);
        expect(query.item(name + '[0]')).toEqual(value + 1);
        expect(query.item(name + '[1]')).toEqual(value + 2);
        expect(query.item(name + '[2]')).toEqual(value + 3);
    });

    it('object', () =>
    {
        const name = "myparam";
        const value = "myvalue";
        const queryString = `${name}.${name}=${encodeURIComponent(value)}`;

        const query = QueryStringCollection.createFromObject({ myparam: { myparam: value } });

        const str = query.toString();
        const obj = query.toObject();
        const items = query.items;

        expect(str).toEqual('?' + queryString);

        expect(obj[name]![name]).toEqual(value);
        expect(items[0].name).toEqual(`${name}.${name}`);
        expect(items[0].value).toEqual(value);
        expect(query.item(`${name}.${name}`)).toEqual(value);
    });

    it('object 2 properties', () =>
    {
        const name = "myparam";
        const prop2name = "myparam2";
        const value = "myvalue";
        const prop2value = "myvalue2";
        const queryString = `${name}.${name}=${encodeURIComponent(value)}&${name}.${prop2name}=${encodeURIComponent(prop2value)}`;

        const query = QueryStringCollection.createFromObject({ [name]: { [name]: value, [prop2name]: prop2value } });

        const str = query.toString();
        const obj = query.toObject();
        const items = query.items;

        expect(str).toEqual('?' + queryString);

        expect(obj[name]![name]).toEqual(value);
        expect(items[0].name).toEqual(`${name}.${name}`);
        expect(items[0].value).toEqual(value);
        expect(query.item(`${name}.${name}`)).toEqual(value);

        expect(obj[name]![prop2name]).toEqual(prop2value);
        expect(items[1].name).toEqual(`${name}.${prop2name}`);
        expect(items[1].value).toEqual(prop2value);
        expect(query.item(`${name}.${prop2name}`)).toEqual(prop2value);
    });
});