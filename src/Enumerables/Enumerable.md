# utilities/Enumerable

The Enumerable class is mostly fluent by design and allows chaining of
_query-like_ methods to filter or aggregate an array or collection.

-   It has been modelled off of the .NET Fluent LINQ extension methods.
-   It inherits from Collection.
-   As with collections, enumerables are immutable - **Every method returns
    a new Enumerable if it returns a Enumerable**

## Predicate type

A Predicate is a delegate method that takes an item of the enumerable as
the argument, and returns a boolean value.

This is used on the `all`, `any` and `where` methods of Enumerable.

`Predicate = (item: any) => boolean`

## Constructors

You can create a new Enumerable from either a current
Collection, an array or nothing.

### Default constructor

```js
let myList = new List();
```

### Array constructor

```js
let myArray = [1, 2, 3, 4];
let myEnumerable = new Enumerable(myArray);
```

### Collection constructor

```js
let myArray = [1, 2, 3, 4];
let myCollection = new Collection(myArray);
let myEnumerable = new Enumerable(myCollection);
```

## Properties

Inherits all properties from Collection.

## Methods

Inherits all methods from Collection.

### all(predicate: Predicate): boolean

> Returns `true` if all the items match the `predicate`.

### any(): boolean

> Returns `true` if the Enumerable contains elements

```js
if (myEnumerable.any()) {
    // do something because the enumerable has elements
}
```

### any(predicate: Predicate): boolean

> Returns `true` if any of the elements satisfy the `predicate`.

```js
let myEnumerable = new ArrayEnumerable([1, 2, 3, 4]);
if (myEnumerable.any((i) => i == 2)) {
    // the enumerable contains a '2'
}
```

### forEach(callback: (value: any, index: number) => boolean | void): void

> Iterates over each item in the collection, performing the callback on
> each item.

Return `false` from your callback to break iteration. You do not have to
return anything if you do not want to break. You can return `true` to
continue iteration if required.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let count = 0;

// iterate over each item, if the item is '3' then break.
myCollection.forEach((value, index) => {
    if (value === 3) {
        return false;
    }
    count++;
});

// count will be equal to 2
```

### item(index: number): any

> Returns the item at the index or throws an exception if the index is
> out of bounds of the Collection.

`myCollection.item(6);`

### sum(propertyName: string): number

> Returns the sum of numbers designated by the `propertyName`.

Useful for getting totals of a dataset.

### sum(selector: (a: any) => number): number

> Returns the sum of numbers returned by the `selector`.

Useful for getting totals of a dataset.

### take(count: number): Enumerable

> Returns a Enumerable that subset of the items from 0 to `count`

### toArray(): []

> Returns the contents of the collection as an array.

`myCollection.toArray();`

### where(predicate: Predicate): Enumerable

> Returns a Enumerable of the items that match the predicate

Used to filter a dataset.

