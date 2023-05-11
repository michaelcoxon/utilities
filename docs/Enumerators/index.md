---
layout: default
title: Enumerator
has_children: false
---

# Enumerator
{: .no_toc }

The enumerator class allows iteration of a collection or array.

{% include article-toc.html %}


An enumerator allows you to move incrementally through a collection or array
giving you the ability to `peek` at the next element or move to it.

## Constructors

You can create a new Enumerator from either a current
Collection or an array.

### Array constructor

```js
let myArray = [1, 2, 3, 4];
let myEnumerator = new Enumerator(myArray);
```

### Collection constructor

```js
let myArray = [1, 2, 3, 4];
let myCollection = new Collection(myArray);
let myEnumerator = new Enumerator(myCollection);
```

## Properties

### current: any

> Returns the current item in the enumeration.

This will throw an error if `moveNext()` is not called **before** it.

This will throw an error if the pointer is invalid (out of bounds).

`myEnumerator.current;`

## Methods

### moveNext(): boolean

> Increments the internal pointer of the Enumerator, essentially
> moving to the next element in the Enumerator.
>
> Returns a boolean value of whether there is another item in the
> enumerator after this item.

Returns `false` if there are no more elements in the enumerator.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let myEnumerator = new Enumerator(myCollection);

// iterate over each item, will break when there
// are no more items left.
while (myEnumerator.moveNext()) {
    // do something here...
}
```

### peek(): any

> Returns the next item in the enumerator without incrementing the internal
> pointer.

Will throw an exception if there is no item to "peek" at.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let myEnumerator = new Enumerator(myCollection);

// check out the first item, it will return 1
let thisIsTheFirstElement = myEnumerator.peek();

// we can still iterate over the collection
while (myEnumerator.moveNext()) {
    // do something here...
}
```

### reset(): void

> Moves the pointer back to the start of the enumerator as thought it were
> freshly created

You must call `moveNext()` after calling this as it resets the entire
iteration.

```js
let myCollection = new Collection([1, 2, 3, 4]);
let myEnumerator = new Enumerator(myCollection);

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

