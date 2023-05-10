# Ensure

Ensure is designed to take the pain out of null checking and making sure (ensuring)
your methods are being used the way they were intended and throwing exceptions when unsupported
values are passed to them.

You can make sure values are in a specific range or simply make sure that an argument is not
null.

It was designed to be readable and fluent based, meaning you can chain ensurables together and
the first one that fails will result in the exception.

## Usage

> **NOTE**: Check the tests for full documentation. I am getting to filling out this
> readme file as I can. The tests have full coverage though.

It's designed to be a one-liner to assert that your arguments are within the bounds of the method. So using
it is as simple as...

```js
Ensure.arg(
    // Step 1: open up the fluent interface
    myArgument, // Step 2: pass in your argument
    'myArgument' // Step 3: tell it the name of your argument
) // Step 4: ???
    .isNotNull(); // Step 5: Make your assertions/profit!!
```

Your assertions can be chained and will execute in the order defined for example

```js
Ensure.arg(str, 'str').isNotNull().isOneOf('str', 'foo', 'bar');
```

### Strings

#### Ensure a string is not null

```js
function testMethod(str: string | null) {
    Ensure.arg(str, 'str').isNotNull();
}
```

