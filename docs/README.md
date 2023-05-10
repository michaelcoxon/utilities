# About

There are a few things in JavaScript that turn out be annoying to write
every time. The idea behind this library is to provide some classes and
functions that help with these issues.

This is influenced by .Net so if you are familiar with
the framework then this will help you a bit.

## Note for TypeScript

If you are using TypeScript, the classes herein contain generics. This means
you _should_ construct them with a type parameter to use them.

For example:

```ts
let myArray = [1, 2, 3, 4];
let myCollection = new Collection<number>(myArray);
```

If the type can be determined by the compiler (as in the example above) it
is not neccessary to explicitly define the type - doing it will just make
the code more readable.

All examples given in the documentation are JavaScript examples so that no-one
gets confused - unless it is generic.

