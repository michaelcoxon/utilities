# utilities/List

A list is a level above a collection. It allows you to add, remove, insert and
prepend items. Think of it as a mutable collection.

It inherits from Collection.

## Constructors

You can create a new List from either a current
Collection, an array or nothing.

### Default constructor

```js
let myList = new List();
```

### Array constructor

```js
let myArray = [1, 2, 3, 4];
let myList = new List(myArray);
```

### Collection constructor

```js
let myArray = [1, 2, 3, 4];
let myCollection = new Collection(myArray);
let myList = new List(myCollection);
```

## Properties

Inherits all properties from Collection.

## Methods

Inherits all methods from Collection.

### addRange(array: []): void

> Adds a array of items to the end of the List.

```js
let myList = new List<number>();

myList.addRange([1, 2, 3]);
```

### addRange(enumerable: IEnumerable<T>): void

> Adds a collection of items to the end of the List.

```js
let myList = new List<number>();
let myCollection = new Collection<number>([1, 2, 3]);

myList.addRange(myCollection);
```



### indexOf(item: T): number | undefined

> Returns the index of an item if it is in the List or `undefined` if it is not.
> Setting `isEquivilent` will compare each item as a JSON serilized object.

`isEquivilent` will essentially compare each item as a string. So even if they
are not the exact same item, by reference, they can be 'equal'.

```js
let myList = new List([1, 2, 3]);

myList.findIndex(2); // returns 1
myList.findIndex(5); // returns undefined
```

### insert(obj: any, index: number): void

> Inserts an item at the `index` and moves the subsequent items up 1 index.

```js
let myList = new List([1, 2, 3]);

myList.insert(4, 2); // will now be [1, 2, 4, 3]
```

### prepend(obj: any): void

> Inserts an item at the start and moves the subsequent items up 1 index.

Shorthand for `myList.insertAt(obj, 0)`.

```js
let myList = new List([1, 2, 3]);

myList.prepend(4); // will now be [4, 1, 2, 3]
```

### prependRange(array: []): void

> Inserts an array of items at the start and moves the subsequent items up 1 index.

```js
let myList = new List([1, 2, 3]);

myList.prependRange([4, 5, 6]); // will now be [4, 5, 6, 1, 2, 3]
```

### prependRange(collection: Collection): void

> Inserts a collection of items at the start and moves the subsequent items up 1 index.

```js
let myList = new List([1, 2, 3]);
let myCollection = new Collection([4, 5, 6]);

myList.prependRange(myCollection); // will now be [4, 5, 6, 1, 2, 3]
```

### removeAt(index: number): void

> Removes an item at the `index` from the List.

```js
let myList = new List([1, 2, 3]);

myList.removeAt(2); // will now be [1, 2]
```

### sort(comparer?: IComparer): void

> Sorts the List using the provided `comparer`.

