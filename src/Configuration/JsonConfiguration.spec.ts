import { empty } from '../Strings';
import { JsonConfigurationBuilder } from './Json';

describe("JsonConfigurationBuilder.build", () =>
{
    it("should return value", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append({ key: 'value' });

        const config = builder.build();
        expect(config).not.toBeUndefined();
    });

    it("should return overridden value", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append({ key: 'value' });
        builder.append({ key: 'value2' });

        const config = builder.build();
        expect(config).not.toBeUndefined();
    });

    it("should return overridden object", () =>
    {
        var builder = new JsonConfigurationBuilder();

        builder.append({
            key: {
                name: 'mike',
                age: 35,
            }
        });
        {
            const config = builder.build();

            const actual = config.get('key');
            expect(actual).toEqual({
                name: 'mike',
                age: 35,
            });
        }

        builder.append({
            key: {
                name: 'dave',
                age: 35,
                hairColor: 'brown',
            }
        });
        {
            const config = builder.build();

            const actual = config.get('key');
            expect(actual).toEqual({
                name: 'dave',
                age: 35,
                hairColor: 'brown',
            });
        }
    });

    it("should return merged object", () =>
    {
        var builder = new JsonConfigurationBuilder();

        builder.append({
            key: {
                name: 'mike',
                age: 35,
            }
        });
        {
            const config = builder.build();

            const actual = config.get('key');
            expect(actual).toEqual({
                name: 'mike',
                age: 35,
            });
        }

        builder.append({
            key: {
                name: 'dave',
                hairColor: 'brown',
            }
        });
        {
            const config = builder.build();

            const actual = config.get('key');
            expect(actual).toEqual({
                name: 'dave',
                age: 35,
                hairColor: 'brown',
            });
        }
    });

});

describe("JsonConfiguration.get", () =>
{
    it("should return value", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append({ key: 'value' });

        const config = builder.build();
        const actual = config.get<string>('key');
        expect(actual).toEqual('value');
    });

    it("should return overridden value", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append({ key: 'value' });
        builder.append({ key: 'value2' });

        const config = builder.build();
        const actual = config.get<string>('key');
        expect(actual).toEqual('value2');
    });

    it("should return object", () =>
    {
        var builder = new JsonConfigurationBuilder();

        builder.append({
            key: {
                name: 'mike',
                age: 35,
            }
        });

        const config = builder.build();
        const actual = config.get('key');
        expect(actual).toEqual({
            name: 'mike',
            age: 35,
        });
    });

    it("should return overridden object", () =>
    {
        var builder = new JsonConfigurationBuilder();

        builder.append({
            key: {
                name: 'mike',
                age: 35,
            }
        });

        builder.append({
            key: {
                name: 'dave',
                age: 35,
                hairColor: 'brown',
            }
        });

        const config = builder.build();
        const actual = config.get('key');
        expect(actual).toEqual({
            name: 'dave',
            age: 35,
            hairColor: 'brown',
        });
    });

    it("should return value from json", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append(`{ "key": "value" }`);

        const config = builder.build();
        const actual = config.get<string>('key');
        expect(actual).toEqual('value');
    });

    it("should return overridden value from json", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append(`{ "key": "value" }`);
        builder.append(`{ "key": "value2" }`);

        const config = builder.build();
        const actual = config.get<string>('key');
        expect(actual).toEqual('value2');
    });
});

describe("JsonConfigurationSection.get", () =>
{
    it("should return value", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append({ key: 'value' });

        const config = builder.build();
        const actual = config.getSection(empty).get<string>('key');
        expect(actual).toEqual('value');
    });

    it("should return overridden value", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append({ key: 'value' });
        builder.append({ key: 'value2' });

        const config = builder.build();
        const actual = config.getSection(empty).get<string>('key');
        expect(actual).toEqual('value2');
    });

    it("should return object", () =>
    {
        var builder = new JsonConfigurationBuilder();

        builder.append({
            key: {
                name: 'mike',
                age: 35,
            }
        });

        const config = builder.build();
        const actual = config.getSection('key');

        expect(actual.get('name')).toEqual('mike');
        expect(actual.get('age')).toEqual(35);
    });

    it("should return overridden object", () =>
    {
        var builder = new JsonConfigurationBuilder();

        builder.append({
            key: {
                name: 'mike',
                age: 35,
            }
        });

        builder.append({
            key: {
                name: 'dave',
                age: 35,
                hairColor: 'brown',
            }
        });

        const config = builder.build();
        const actual = config.get('key');
        expect(actual).toEqual({
            name: 'dave',
            age: 35,
            hairColor: 'brown',
        });
    });

    it("should return value from json", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append(`{ "key": "value" }`);

        const config = builder.build();
        const actual = config.get<string>('key');
        expect(actual).toEqual('value');
    });

    it("should return overridden value from json", () =>
    {
        var builder = new JsonConfigurationBuilder();
        builder.append(`{ "key": "value" }`);
        builder.append(`{ "key": "value2" }`);

        const config = builder.build();
        const actual = config.get<string>('key');
        expect(actual).toEqual('value2');
    });
});