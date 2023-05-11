---
layout: default
parent: Utilities
---

# usingAsync

Can be used on any `IDisposable` objects. Will call `IDisposable.dispose()` when the scope ends.

This is for `Promise`s. It will wait for the `Promise` to resolve then dispose the `IDisposable`.

### usingAsync<T extends IDisposable, TResult>(disposableObjectFactory: () => T, inner: (disposableObject: T) => Promise<TResult>): Promise<TResult>

> Creates a disposable object then cleans it up after inner has resolved. 

```js
usingAsync(() => new ConsoleLogger(), async (logger) => logger.debug(await (await fetch("https://example.com/_api/items")).json()));
```
