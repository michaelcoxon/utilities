# Collection

This is the base class for `List`.

## Constructors

You can create a new Collection from either a current
Collection, an array or nothing.

### Default constructor

```js
let myCollection = new Collection();
```

### Array constructor

```js
let myArray = [1, 2, 3, 4];
let myCollection = new Collection(myArray);
```

### Collection constructor

```js
let myArray = [1, 2, 3, 4];
let myCollection = new Collection(myArray);
let myCollection2 = new Collection(myCollection);
```

## Properties

### length: number

> Returns to number of items in the Collection.

This will return a number greater than or equal to 0.

`myCollection.length;`

### isReadOnly: boolean

> Gets a value indicating whether the `ICollection<T>` is read-only.

This will return true if you cannot change the collection.

```js
if(myCollection.isReadOnly)
{
    setReadOnly(true);
}
else
{
    setReadOnly(false);
}
```


## Methods

### add(obj: any): void

> Adds an item to the List.

```js
let myList = new List();

myList.add(1);
```

### clear(): void

> Removes all items from the List.

```js
let myList = new List([1, 2, 3]);

myList.clear();
```

### contains(obj: any, isEquivilent?: boolean): boolean

> Returns true if the List contains the item. Setting `isEquivilent` will
> compare each item as a JSON serilized object.

`isEquivilent` will essentially compare each item as a string. So even if they
are not the exact same item, by reference, they can be 'equal'.

```js
let myList = new List([1, 2, 3]);

myList.contains(2); // returns true
myList.contains(5); // returns false
```

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

### remove(obj: any): void

> Removes an item from the List.

```js
let myList = new List([1, 2, 3]);

myList.remove(1); // will now be [2, 3]
```

