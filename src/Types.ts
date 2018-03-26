

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type Promisable<T> = T | PromiseLike<T>;
/** The event handler type */
export type EventHandler<TEventArgs> = (sender: any, args: TEventArgs) => void;

/**
 * helper type for representing constructors
 */
export type ConstructorFor<T> = { new(...args: any[]): T; }

export type Action<T> = () => T;

export type Func1<Tin, Tout> = (arg1: Tin) => Tout;

export type Func2<Tin1, Tin2, Tout> = (arg1: Tin1, arg2: Tin2) => Tout;

export type Func3<Tin1, Tin2, Tin3, Tout> = (arg1: Tin1, arg2: Tin2, arg3: Tin3) => Tout;

export type Func4<Tin1, Tin2, Tin3, Tin4, Tout> = (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4) => Tout;

export type Func5<Tin1, Tin2, Tin3, Tin4, Tin5, Tout> = (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4, arg5: Tin5) => Tout;

export type Func6<Tin1, Tin2, Tin3, Tin4, Tin5, Tin6, Tout> = (arg1: Tin1, arg2: Tin2, arg3: Tin3, arg4: Tin4, arg5: Tin5, arg6: Tin6) => Tout;
