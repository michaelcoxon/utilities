---
layout: default
parent: Type helpers
grand_parent: Helpers

title: isNullOrEmpty
---

<script src="{{ site.baseurl }}{% link assets/dist/index.js %}"></script>

# Assert a lack of content

`isNullOrEmpty` works on objects that implement `Iterable` so it can be used to check if
`Array`s or `string`s are empty or `null`.

Here is an example using a `string`. We detect that `greeting` has no value then
set a default value of `'Hello'`.

<div class="code-example">
    <script>
        function greet(name, greeting) {
            if (utilities.isNullOrEmpty(greeting)) {
                greeting = 'Hello';
            }
            return `${greeting} ${name}.`;
        }
        function execute(fn) {
            const el = document.getElementById('isNullOrEmpty-example-result');
            const value = fn();
            el.innerText = value;
        }
    </script>
    <div>
        <button type="button" onclick="execute(() => greet('world'))" >Execute example 1</button>
        <button type="button" onclick="execute(() => greet('Greg', 'Hi'))" >Execute example 2</button>
        <p>
            <strong>Results</strong><br>
            <span id="isNullOrEmpty-example-result"></span>
        </p>
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

This example shows how you can use and array or Iterable.



```ts
function greet(name, greeting) {
    if (isNullOrEmpty(greeting)) {
        greeting = 'Hello';
    }
    return `${greeting} ${name}.`;
}
// "Hello world."
const helloWorld = greet('world');
// "Hi Greg."
const hiGreg = greet('Greg', 'Hi');
```
