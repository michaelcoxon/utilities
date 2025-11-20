# Copilot Instructions for @michaelcoxon/utilities

## Project Overview

This is a **TypeScript utility library** inspired by .NET, providing LINQ-like operations, collection types, and common programming patterns. The library exports modular namespaces (Arrays, Enumerables, Strings, etc.) and is published to npm as `@michaelcoxon/utilities`.

**Key characteristics:**
- .NET-inspired patterns (IEnumerable, IDisposable, Exception hierarchy)
- Dual build output: ES modules (`lib/`) for tree-shaking + UMD bundle (`dist/`) for browsers
- Strict TypeScript with decorators enabled
- Jest for testing with coverage requirements
- No external runtime dependencies (only `tslib`)

## Architecture & Core Patterns

### 1. Enumerable System (LINQ-style)

The centerpiece is a .NET LINQ-inspired enumeration system in `src/Enumerables/`:

- **`IEnumerable<T>`** - Core interface extending `Iterable<T>` with LINQ methods (`.where()`, `.select()`, `.groupBy()`, etc.)
- **`EnumerableBase<T>`** - Abstract base class implementing `IEnumerable<T>`
- **Concrete implementations:**
  - `ArrayEnumerable<T>` - Wraps arrays with enumerable methods
  - `Collection<T>`, `List<T>`, `Dictionary<TKey, TValue>`, `Set<T>`, `LinkedList<T>`
- **Lazy evaluation** via `EnumeratorEnumerable<T>` + separate enumerator classes (`src/Enumerators/`)

**Key convention:** Enumerators handle iteration logic; Enumerables provide the fluent API. Avoid eager evaluation unless necessary (`.toArray()`, `.count()`).

### 2. Module Organization

Each namespace is a folder with an `index.ts` that re-exports types and utilities:

```typescript
// src/Enumerables/index.ts exports all classes
export { IEnumerable, ICollection, IDictionary } from './_types';
export class ArrayEnumerable<T> implements IEnumerable<T> { ... }

// Main index.ts re-exports as namespaces
export * as Enumerables from './Enumerables';
export * as Strings from './Strings';
```

**Consumer usage:**
```typescript
import { Enumerables, Strings } from '@michaelcoxon/utilities';
const list = new Enumerables.List([1, 2, 3]);
```

### 3. Exception Hierarchy

All exceptions inherit from `Exception` (extends `Error`) located in `src/Exceptions/`. Common types:
- `ArgumentException`, `ArgumentNullException`, `ArgumentUndefinedException`
- `InvalidOperationException`, `NotImplementedException`, `NotSupportedException`
- Domain-specific: `KeyNotFoundException`, `IndexOutOfRangeException`

**Pattern:** Use `new ArgumentNullException(paramName)` rather than generic errors.

### 4. Validation with `ensure()`

The `src/ensure/` module provides fluent validation:

```typescript
import ensure from './ensure';

function myFunc(name: string) {
    ensure(name, 'name').isNotNullOrUndefined(); // Throws ArgumentException if violated
}
```

**Builders:** `ArgumentAssertionBuilder`, `StringArgumentAssertionBuilder`, `GuidArgumentAssertionBuilder`, etc.

### 5. Resource Management

- **`IDisposable` interface** - Implement `.dispose()` for resource cleanup
- **`using(factory, callback)`** - Automatic disposal (sync version)
- **`usingAsync(factory, callback)`** - Async disposal pattern
- **`AggregateDisposable`** - Dispose multiple resources together

### 6. Utility Classes

- **`Lazy<T>`** - Deferred initialization with `.value` and `.isValueCreated`
- **`Guid`** - GUID creation/parsing/validation (uses custom integer types like `UnsignedInt32`)
- **`Mutex`** - Simple async mutex for resource locking
- **`Timer`** - Wrapper for `setTimeout`/`setInterval` with disposal
- **`Watch`** - Stopwatch/timer using `performance.now()` for elapsed time tracking

### 7. Component System

Generic functional component pattern in `src/Components/`:
- **`Component<TProps>`** - Base class implementing `IComponent<TProps>` with property change notifications
- Supports component composition via nested `components` enumerable
- Implements `IDisposable` for cleanup and `INotifyPropertyChanged` for reactivity
- Use for building composable, stateful objects with props-based configuration

### 8. Unstable APIs

The `src/__unstable/` directory contains work-in-progress features:
- Experimental APIs subject to breaking changes
- Not exported in main `index.ts`
- Examples: `Tree<T>` (tree data structures), `_CancellablePromise`, `_FactoryModelState`
- **Safe to experiment with** but avoid production use until promoted to stable

## Build & Development Workflow

### Scripts

```powershell
# Build library (TypeScript → lib/)
npm run build:lib              # Production (no sourcemaps)
npm run build:lib:debug        # Development (with sourcemaps)

# Build browser bundle (Webpack → dist/)
npm run build:dist             # Minified UMD
npm run build:dist:debug       # Unminified with sourcemaps

# Full build (both outputs)
npm run build                  # Runs build:lib + build:dist

# Testing
npm test                       # Runs Jest + Madge circular dependency check
npm run test:coverage          # Jest with coverage report (→ coverage/)
npm run test:madge             # Check for circular imports

# Documentation
npm run build:docs             # TypeDoc API docs → docs/api/
npm run start:jekyll           # Serve Jekyll site locally

# Pre-publish
npm run prepack                # Full clean, test, build (runs before npm pack/publish)
```

### TypeScript Configuration

- **`tsconfig.json`** - Base config for development (includes tests)
- **`tsconfig.build.json`** - Extends base, excludes `*.spec.ts` files
- **Output:** ES2019 target, ESNext modules, declaration files to `lib/`
- **Strict mode enabled** with decorators support

### Testing Conventions

Tests live alongside source files as `*.spec.ts`:

```typescript
// src/Lazy.spec.ts
describe("Lazy.constructor", () => {
    it("should not call the factory until it has been asked for", () => {
        let wasCalled = false;
        const lazy = new Lazy(() => { wasCalled = true; return "value"; });
        expect(!wasCalled);
        lazy.value;
        expect(wasCalled);
    });
});
```

**Run tests during development:** Tests are excluded from production builds via `tsconfig.build.json`.

## Coding Conventions

### Naming

- **Interfaces:** Prefix with `I` (e.g., `IEnumerable`, `IDisposable`, `IComparer`)
- **Type aliases:** No prefix (e.g., `Predicate<T>`, `Selector<T, TReturn>`, `KeyValuePair<K, V>`)
- **Private fields:** Use `#` syntax for true private fields (e.g., `#value`, `#factory`)

### Type Patterns

Common type aliases in `src/Types.ts`:

```typescript
type Nullable<T> = T | null;
type Undefinable<T> = T | undefined;
type Predicate<T> = (item: T) => boolean;
type Selector<T, TReturn> = (item: T) => TReturn;
type ConstructorFor<T> = { new(...args: any[]): T };
```

### Import/Export Style

- Use **named exports** for classes/functions
- Use `export default` only for primary class in file (e.g., `export default class Guid`)
- Group exports by type in index files
- Import namespaces: `import { Enumerables } from './Enumerables'`

## Key Integration Points

### i18n Strings

String resources are loaded at module load time (see `src/index.ts`):

```typescript
import './i18n/en/assertions.strings';
import './i18n/en/exceptions.strings';
```

Accessed via `SR` imports in validation/exception code.

### Dependencies

- **Runtime:** Only `tslib` (TypeScript helpers)
- **Dev:** Jest, Webpack, TypeDoc, Madge (circular check), ESLint
- **No lodash/ramda** - implements own utility functions

### Circular Dependencies

Use **Madge** to detect cycles (`npm run test:madge`). Avoid importing from parent modules in child utilities.

## Documentation

- **API docs:** Generated via TypeDoc to `docs/api/` 
- **Jekyll site:** Hosted on GitHub Pages at https://michaelcoxon.github.io/utilities/
- **README.md:** Links to docs, directs users to tests for usage examples
- **JSDoc comments:** Use for all public APIs

## Version Policy

Current version: **11.1.0**
- Follow semantic versioning (major.minor.patch)
- Breaking changes increment major version
- New features increment minor version
- Bug fixes increment patch version

## Common Tasks

**Adding a new utility function:**
1. Create in appropriate namespace folder (e.g., `src/Arrays/myUtil.ts`)
2. Export from namespace `index.ts`
3. Add tests in `myUtil.spec.ts`
4. Run `npm test` to verify

**Adding a new enumerable method:**
1. Add to `IEnumerable<T>` interface in `src/Enumerables/_types.ts`
2. Implement in `EnumerableBase` or specific classes in `src/Enumerables/index.ts`
3. Create enumerator if lazy evaluation needed (in `src/Enumerators/`)
4. Add tests and update documentation

**Before commit:**
```powershell
npm run test:prepack  # Runs coverage + madge checks
```
