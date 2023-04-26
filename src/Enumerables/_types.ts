import { ConstructorFor, KeyValuePair, Predicate, Selector, Undefinable } from '../Types';
import { IComparer } from '../Comparers/_types';
import { IEnumerator } from '../Enumerators/_types';


export interface IEnumerable<T> extends Iterable<T>
{
    [Symbol.iterator](): Iterator<T>;
    
    /**
    * Returns true if all the items match the predicate, otherwise false
    * @param predicate
    * 
    */
    all(predicate: Predicate<T>): boolean;

    /**
     * Adds a value to the end of the sequence.
     * @param item
     */
    append(item: T): IEnumerable<T>;

    /**
     * Returns true if any of the items match the predicate, otherwise false
     * @param predicate
     * @example
     * ```
     * if (myEnumerable.any()) {
     *     // do something because the enumerable has elements
     * }
     * ```
     * ```
     * let myEnumerable = new ArrayEnumerable([1, 2, 3, 4]);
     * if (myEnumerable.any((i) => i == 2)) {
     *     // the enumerable contains a '2'
     * }
     * ```
     */
    any(predicate?: Predicate<T>): boolean;

    /**
     * Returns the average of the numbers selected by the selector
     * @param selector
     */
    average(selector: Selector<T, number>): number;

    /**
     * Concatenates two sequences.
     * @param first The first sequence to concatenate.
     * @param second The sequence to concatenate to the first sequence.
     */
    concat(next: IEnumerable<T>): IEnumerable<T>;

    /**
     * Determines whether a sequence contains a specified element.
     * @param item The value to locate in the sequence.
     */
    contains(item: T): boolean;

    /** Returns the number of items in the enumerable */
    count(): number;

    /**
     * Returns the unique items designated by the selector
     * @param selector
     */
    distinct<R>(selector: Selector<T, R>): IEnumerable<T>;

    /** Returns the first item in the enumerable */
    first(): T;

    /**
     * Returns the first item in the enumerable that matches the predicate
     * @param predicate
     */
    first(predicate: Predicate<T>): T;

    /** Returns the first item in the enumerable or null */
    firstOrDefault(): T | null;

    /**
     * Returns the first item in the enumerable that matches the predicate or null
     * @param predicate
     */
    firstOrDefault(predicate: Predicate<T>): T | null;

    /**
     * Iterates over the enumerable and performs the callback on each item. Return false to break.
     * @param callback
     */
    forEach(callback: (value: T, index: number) => boolean | void): void;

    /** returns an Enumerator for the items */
    getEnumerator(): IEnumerator<T>;

    /**
     * Groups the items by the key selector using the default comparer
     * @param keySelector
     */
    groupBy<TKey>(keySelector: Selector<T, TKey>): IEnumerable<IEnumerableGroup<T, TKey>>;

    /**
     * Groups the items by the key selector using the specified comparer
     * @param keySelector
     * @param comparer
     */
    groupBy<TKey>(keySelector: Selector<T, TKey>, comparer: IComparer<TKey>): IEnumerable<IEnumerableGroup<T, TKey>>;

    /**
     * Returns the item at the specified index
     * @param index The index of the item to return
     */
    item(index: number): Undefinable<T>;

    // /**
    //  * Returns a join aggregate of the inner to the current
    //  * @param inner
    //  * @param outerKeySelector
    //  * @param innerKeySelector
    //  * @param resultSelector
    //  */
    // join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (o: T) => TKey, innerKeySelector: (i: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult): IEnumerable<TResult>;

    /** Returns the last item in the enumerable */
    last(): T;

    /**
     * Returns the last item in the enumerable that matches the predicate
     * @param predicate
     */
    last(predicate: Predicate<T>): T;

    /** Returns the last item in the enumerable or null */
    lastOrDefault(): T | null;

    /**
    * Returns the last item in the enumerable that matches the predicate or null
    * @param predicate
    */
    lastOrDefault(predicate: Predicate<T>): T | null;

    /**
     * Returns the largest number designated by the selector
     * @param selector
     */
    max(selector: Selector<T, number>): number;

    /**
    * Returns the smallest number designated by the selector
    * @param selector
    */
    min(selector: Selector<T, number>): number;

    /**
     * Returns an enumerable of items that match the type
     * @param ctor the type
     */
    ofType<N extends T>(ctor: ConstructorFor<N>): IEnumerable<N>;

    /**
     * Orders the enumerable by the the selector and optional comparer ascending
     * @param selector
     * @param comparer
     */
    orderBy<R>(selector: Selector<T, R>, comparer?: IComparer<R>): IEnumerable<T>;

    /**
     * Orders the enumerable by the the selector and optional comparer descending
     * @param selector
     * @param comparer
     */
    orderByDescending<R>(selector: Selector<T, R>, comparer?: IComparer<R>): IEnumerable<T>;

    /**
     * Adds a value to the beginning of the sequence.
     * @param item
     */
    prepend(item: T): IEnumerable<T>;

    /**
     * Selects the items by the selector
     * @param selector
     */
    select<TOut>(selector: Selector<T, TOut>): IEnumerable<TOut>;

    selectMany<TOut>(selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>;

    /**
     * Returns a single element only if there is one element in the enumerable
     * @throws InvalidOperationException if there is not exactly one item in the enumerable
     */
    single(): T;

    /**
     * Returns a single element only if there is one element in the enumerable that matches the predicate
     * @param predicate
     * @throws InvalidOperationException if there is not exactly one item in the enumerable that matches the predicate
     */
    single(predicate: Predicate<T>): T;

    /**
     * Returns a single element only if there is one element in the enumerable. If there are no items in the
     * enumerable, then null is returned
     * @throws InvalidOperationException if there is not exactly one or zero items in the enumerable
     */
    singleOrDefault(): T | null;

    /**
     * Returns a single element only if there is one element in the enumerable that matches the predicate.
     * If there are no items in the enumerable, then null is returned
     * @throws InvalidOperationException if there is not exactly one or zero item in the enumerable that matches the predicate
     */
    singleOrDefault(predicate: Predicate<T>): T | null;

    /**
     * Skips the number of items specified. If the count is larger than the size
     * of the enumerable, no items will be returned.
     * @param count the number of items to skip
     */
    skip(count: number): IEnumerable<T>;

    /**
     * Splits a enumerable into two queryables. One set is for true predicates, the other set is for false predicates.
     * @param predicate
     */
    split(predicate: Predicate<T>): { pTrue: IEnumerable<T>, pFalse: IEnumerable<T>; };

    /**
     * Sums the items in the enumerable using the selector
     * @param selector selector to return the number to be summed
     */
    sum(selector: Selector<T, number>): number;

    /**
     * Takes the number of specified items from the enumerable. If the count is
     * larger than the size of the enumerable, all items will be returned
     * @param count the number of items to take.
     */
    take(count: number): IEnumerable<T>;

    /** Returns the items as an array */
    toArray(): T[];

    /** Returns a dictionary based on the key and value selctors */
    toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>;

    /** Returns the items as a List */
    toList(): IList<T>;

    /**
     * Filters the enumerable by the predicate
     * @param predicate the filter for each item.
     */
    where(predicate: Predicate<T>): IEnumerable<T>;
}

export interface ICollection<T> extends IEnumerable<T>
{
    /** Gets the number of elements contained in the ICollection<T>. */
    readonly length: number;

    /** Gets a value indicating whether the ICollection<T> is read-only. */
    readonly isReadOnly: boolean;

    /**
     * Adds an item to the ICollection<T>.
     * @param item The object to add to the ICollection<T>.
     */
    add(item: T): void;

    /** Removes all items from the ICollection<T>. */
    clear(): void;

    /**
     * Determines whether the ICollection<T> contains a specific value.
     * @param item The object to locate in the ICollection<T>.
     */
    contains(item: T): boolean;

    /**
     * Copies the elements of the ICollection<T> to an Array, starting at a particular Array index.
     * @param array The one-dimensional Array that is the destination of the elements copied from ICollection<T>. The Array must have zero-based indexing.
     * @param arrayIndex The zero-based index in array at which copying begins.
     */
    copyTo(array: T[], arrayIndex: number): void;

    /**
     * Removes the first occurrence of a specific object from the ICollection<T>.
     * @param item
     */
    remove(item: T): boolean;
}

export interface IDictionary<TKey, TValue> extends ICollection<KeyValuePair<TKey, TValue>>, IEnumerable<KeyValuePair<TKey, TValue>>
{
    readonly keys: TKey[];

    readonly values: TValue[];

    addKeyValue(key: TKey, value: TValue): void;

    containsKey(key: TKey): boolean;

    itemByKey(key: TKey): TValue;

    removeByKey(key: TKey): boolean;

    tryGetValue(key: TKey): { value?: TValue, success: boolean; };
}

export interface IEnumerableGroup<T, TKey> extends IEnumerable<T>
{
    readonly key: TKey;
}

export interface IList<T> extends ICollection<T>, IEnumerable<T>
{
    addRange(array: T[]): void;

    addRange(enumerable: IEnumerable<T>): void;

    indexOf(item: T): number | undefined;

    insert(item: T, index: number): void;

    prepend(item: T): void;

    prepend(item: T): IEnumerable<T>;

    prependRange(array: T[]): void;

    prependRange(enumerable: IEnumerable<T>): void;

    removeAt(index: number): void;

    sort(comparer: IComparer<T>): void;
}

export interface IReadOnlyCollection<T> extends IEnumerable<T>
{
    readonly length: number;
}

export interface ISet<T> extends ICollection<T>, IEnumerable<T>
{
    /**
     * Removes all elements in the specified collection from the current set.
     * @param enumerable The collection of items to remove from the set.
     */
    exceptWith(enumerable: IEnumerable<T>): void;

    /**
     * Modifies the current set so that it contains only elements that are also in a specified collection.
     * @param enumerable The collection to compare to the current set.
     */
    intersectWith(enumerable: IEnumerable<T>): void;

    /**
     * Determines whether a set is a subset of a specified collection.
     * @param enumerable The collection to compare to the current set.
     * @returns true if the current set is a subset of other; otherwise, false.
     */
    isSubsetOf(enumerable: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified collection.
     * @param enumerable The collection to compare to the current set.
     * @returns true if the current set is a superset of other; otherwise, false.
     */
    isSupersetOf(enumerable: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set overlaps with the specified collection.
     * @param enumerable The collection to compare to the current set.
     * @returns true if the current set and other share at least one common element; otherwise, false.
     */
    overlaps(enumerable: IEnumerable<T>): boolean;

    /**
     * Determines whether the current set and the specified collection contain the same elements.
     * @param enumerable The collection to compare to the current set.
     * @returns true if the current set is equal to other; otherwise, false.
     */
    setEquals(enumerable: IEnumerable<T>): boolean;

    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or in the specified collection, but not both.
     * @param enumerable The collection to compare to the current set.
     */
    symmetricExceptWith(enumerable: IEnumerable<T>): void;

    /**
     * Modifies the current set so that it contains all elements that are present in the current set, in the specified collection, or in both.
     * @param enumerable The collection to compare to the current set.
     */
    unionWith(enumerable: IEnumerable<T>): void;
}

export interface LinkedListItem<T>
{
    value: T;
    next?: LinkedListItem<T>;
}