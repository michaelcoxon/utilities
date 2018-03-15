# utilities
Simple utility classes and function for JS and TypeScript

Check out the tests for a more comprehesive doco.

### Note for TypeScript
If you are using TypeScript, the classes herein are generics. This means
you *should* construct them with a type parameter to use them.

For example:
```js
let myArray = [1, 2, 3, 4];
let myCollection = new Collection<number>(myArray);
```

If the type can be determined by the compiler (as in the example above) it
is not neccessary to explicitly define the type - doing it will just make 
the code more readable.

All examples given in the documentation are JavaScript examples so that no-one 
gets confused.

Just use this as you need to - sometimes it wont be neccessary - the examples
below will still work fine.


# AsyncWrapper
The AsyncWrapper is provided to monitor the state of a promise.
You can use this to provide state feedback to the user of an awaitable
method.

## Constructors

### Default constructor
> Creates a new unresolved AsyncWrapper
```js
let myAsyncWrapper = new AsyncWrapper();
```

### Promise constructor
> Creates a new AsyncWrapper from a promise
```js
let myAsyncWrapper = new AsyncWrapper(myPromise);
```

### Value constructor
> Creates a new AsyncWrapper from a value
```js
let myAsyncWrapper = new AsyncWrapper(myValue);
```

## Properties
### count: number
> Returns to number of items in the Collection.

This will return a number greater than or equal to 0.

`myCollection.count;`

## Methods
### copyTo(into: Collection): void
> Copies the items from the current collection into another one.

This appends the items from one collection into another.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let myCollection2 = new Collection([-1, 0]);

// copy the items from myCollection into myCollection2
myCollection.copyTo(myCollection2);

// the contents of myCollection2 will now be: [-1, 0, 1, 2, 3, 4]
```

## Extension methods
These methods will only work if you have included the module that they are in.
The module is the first part and the method is the second part in the docs 
below using the pattern `{module}::{method}`

### Enumerator::getEnumerator(): Enumerator
> Returns an Enumerator for a collection.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let myCollectionEnumerator = myCollection.getEnumerator();
```