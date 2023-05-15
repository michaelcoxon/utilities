---
layout: default
title: Enumerator
has_children: false
---

# Enumerator
{: .no_toc }

The enumerator class allows iteration of a collection or array.

{% include article-toc.md %}


An Enumerator allows you to `moveNext()` incrementally through a collection or array
giving you the ability to `peek()` at the next element or move to it. When `peek`ing an
element, you resolve that element. This means that if you are enumerating something like a
`Generator`, the Enumerator will call `next()`.

## Constructors

You can create a Enumerators from arrays, Collections, Lists, or any IEnumerable or Iterable.

### Array

```js
let myArray = [1, 2, 3, 4];
let myEnumerator = new ArrayEnumerator(myArray);
```

### Collection

```js
let myArray = [1, 2, 3, 4];
let myCollection = new Collection(myArray);
let myEnumerator = myCollection.getEnumerator();
```

### Enumerable

```js
let myCollection = Enumerable.range(1,100);
let myEnumerator = myCollection.getEnumerator();
```

### Iterable
There are a couple of concerns with Iterables that need to be addressed.
As per the spec, Iterables are never guaranteed to be re-playable. You have two options:

1. `IterableEnumerator` - this will interface directly with the Iterable and abide by the 
    rules of the spec regarding re-playability.
2. `BufferedEnumerator` - this will 'remember' previous values and only move the Iterable on
    if required. This allows you to `reset` the Enumerator 


```js
let myCollection = Enumerable.range(1,100);
let myEnumerator = myCollection.getEnumerator();
```

## Properties
These properties are common on all Enumerators.

### current: any

Returns the current item in the enumeration.

This will throw an error if `moveNext()` is not called **before** it.

This will throw an error if the pointer is invalid (out of bounds).

`myEnumerator.current;`

## Methods
These methods are common on all Enumerators.

### moveNext(): boolean

Moves to the next item in the Enumerator and assigns it to `current`.

Returns a `boolean` value of whether there is another item in the
Enumerator after this item.

Returns `false` if there are no more items in the Enumerator.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let myEnumerator = myCollection.getEnumerator();

// iterate over each item, will break when there
// are no more items left.
while (myEnumerator.moveNext()) {
    // do something here...
    const value = myEnumerator.current;
}
```

### peek(): any

Returns the next item in the enumerator without incrementing the internal
pointer.

Will return `undefined` if there is nothing to `peek` at.

> Note: *Possible edge-case* It should be noted that if there is a value of `undefined` in 
> the Enumerator source, then the `peek` method should not be used. This state would provide 
> incorrect results.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let myEnumerator = myCollection.getEnumerator();

// check out the first item, it will return 1
let thisIsTheFirstElement = myEnumerator.peek();

// we can still iterate over the collection
while (myEnumerator.moveNext()) {
    // do something here...
    const value = myEnumerator.current;
}
```

### reset(): void

Moves the pointer back to the start of the enumerator as thought it were
freshly created

You must call `moveNext()` after calling this as it resets the entire
iteration.

> Note: *Iterables* Iterables cannot be reset. Use `BufferedIterableEnumerator`
> if you need reset capabilities.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let myEnumerator = myCollection.getEnumerator();

// iterate over the collection
while (myEnumerator.moveNext()) {
    // do something here...
}

// reset the iteration
myEnumerator.reset();

// iterate over the collection again
while (myEnumerator.moveNext()) {
    // do something else here...
}
```

