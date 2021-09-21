import { IEnumerable } from './Enumerables/IEnumerable';

/** A type that is either an array or an enumerable */
export type IEnumerableOrArray<T> = T[] | IEnumerable<T>;

/** A function that returns the value of the key */
export type KeySelector<T, K extends keyof T> = (propertyName: K) => T[K];

/** A key and value pair */
export type KeyValuePair<TKey, TValue> = { readonly key: TKey; readonly value: TValue; };

/** Shortcut for T | null */
export type Nullable<T> = T | null;

/** Shortcut for T | undefined */
export type Undefinable<T> = T | undefined;

/** Shortcut for T | Promise<T> */
export type Awaitable<T> = T | PromiseLike<T>;

/** The event handler type */
export type EventHandler<TEventArgs> = (sender: any, args: TEventArgs) => void;

/** Helper type for representing constructors */
export type ConstructorFor<T> = { new(...args: any[]): T; };

/** Shortcut for () => T */
export type Action<T> = () => T;

/** Shortcut for (arg1: Tin) => Tout */
export type Func1<Tin, Tout> = (arg1: Tin) => Tout;

/** Shortcut for (arg1: Tin1, arg2: Tin2) => Tout */
export type Func2<Tin1, Tin2, Tout> = (arg1: Tin1, arg2: Tin2) => Tout;

/** Shortcut for (arg1: Tin1, arg2: Tin2, arg3: Tin3) => Tout */
export type Func3<Tin1, Tin2, Tin3, Tout> = (arg1: Tin1, arg2: Tin2, arg3: Tin3) => Tout;

/** Shortcut for (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4) => Tout */
export type Func4<Tin1, Tin2, Tin3, Tin4, Tout> = (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4) => Tout;

/** Shortcut for (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4, arg5: Tin5) => Tout */
export type Func5<Tin1, Tin2, Tin3, Tin4, Tin5, Tout> = (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4, arg5: Tin5) => Tout;

/** Shortcut for (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4, arg5: Tin5, arg6: Tin6) => Tout */
export type Func6<Tin1, Tin2, Tin3, Tin4, Tin5, Tin6, Tout> = (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4, arg5: Tin5, arg6: Tin6) => Tout;

/** Takes an item and return a boolean value from an assertion on the item */
export type Predicate<T> = (item: T) => boolean;

/** Takes an item and maps it to TReturn */
export type Selector<T, TReturn> = (item: T) => TReturn;

/** Represents a comparision between two items of the same type. Should return 0 if they are the same, >0 if a > b, <0 if a < b. */
export type Comparison<T> = (a: T, y: T) => number;

/** Represents any function*/
export type AnyFunction = (...args: any[]) => any;
