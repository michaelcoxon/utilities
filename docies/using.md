# utilities/using

Can be used on any `IDisposable` objects. Will call `IDisposable.dispose()` when the scope ends.

DO NOT USE ON PROMISES!!! use `usingAsync` instead.

### using<T extends IDisposable, TResult>(disposableObjectFactory: () => T, inner: (disposableObject: T) => TResult): TResult

> Creates a disposable object then cleans it up after inner has finished execution. 

```js
using(() => new ConsoleLogger(), (logger) => logger.debug('Hello world!'));
```
