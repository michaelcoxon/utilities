---
layout: default
parent: Type helpers
grand_parent: Helpers

title: isNullOrEmpty
---

# Assert a lack of content

`isNullOrEmpty` works on objects that implement `Iterable` so it can be used to check if
`Array`s or `string`s are empty or `null`.

Here is an example using a `string`. We detect that `greeting` has no value then
set a default value of `'Hello'`.

```ts
function greet(name, greeting) {
    if (!isNullOrEmpty(greeting)) {
        greeting = 'Hello';
    }
    return `${greeting} ${name}.`;
}
// "Hello world."
const helloWorld = greet('world');
// "Hi Greg."
const hiGreg = greet('Greg', 'Hi');
```

This example shows how you can use and array or Iterable.

<div class="code-example">
    <script src="{{ site.baseurl }}{% link assets/js/list.js %}" </script>
    <script>
        function greet(name, greeting) {
            if (!isNullOrEmpty(greeting)) {
                greeting = 'Hello';
            }
            return `${greeting} ${name}.`;
        }
        function execute(fn) {
            const el = document.getElementById('isNullOrEmpty-example-result');
            el.innnerText = fn();
        }
    </script>
    <div>
        <button type="button" onclick="execute(() => greet('world'))" >Execute</button>
        <p id="isNullOrEmpty-example-result"></p>
    </div>
</div>

```ts
function greet(name, greeting) {
    if (!isNullOrEmpty(greeting)) {
        greeting = 'Hello';
    }
    return `${greeting} ${name}.`;
}
// "Hello world."
const helloWorld = greet('world');
// "Hi Greg."
const hiGreg = greet('Greg', 'Hi');
```
