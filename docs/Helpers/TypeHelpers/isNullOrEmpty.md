---
layout: default
parent: Type helpers
grand_parent: Helpers

title: isNullOrEmpty
---

<script src="{{ site.baseurl }}{% link assets/dist/index.js %}"></script>

# Assert a lack of content

`isNullOrEmpty` works on objects that 'have items', so it can be used to check if
`Array`s or `string`s are empty or `null` (or `undefined`).

Here is an example using a `string`. We detect that `greeting` has no value then
set a default value of `'Hello'`.

<div class="code-example">
    <div>
        <button type="button" onclick="executeisNullOrEmptyStringExample(() => greet('world'))" >Execute helloWorld</button>
        <button type="button" onclick="executeisNullOrEmptyStringExample(() => greet('Greg', 'Hi'))" >Execute hiGreg</button>
        <p>
            <strong>Results</strong><br>
            <span id="isNullOrEmpty-string-example-result"></span>
        </p>
    </div>    
    <script>
        function greet(name, greeting) {
            if (utilities.isNullOrEmpty(greeting)) {
                greeting = 'Hello';
            }
            return `${greeting} ${name}.`;
        }
        function executeisNullOrEmptyStringExample(fn) {
            const el = document.getElementById('isNullOrEmpty-string-example-result');
            const value = fn();
            el.innerText += value+'\n';
        }
    </script>

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

This example shows how you can use an array.

<div class="code-example">
    <div>
        <button type="button" onclick="executeisNullOrEmptyArrayExample(() => getItemsisNullOrEmptyArrayExample())" >Get Items</button>
        <button type="button" onclick="executeisNullOrEmptyArrayExample(() => clearItemsisNullOrEmptyArrayExample())" >Clear Items</button>
        <button type="button" onclick="executeisNullOrEmptyArrayExample(() => createItemsisNullOrEmptyArrayExample())" >Create Items</button>
        <button type="button" onclick="executeisNullOrEmptyArrayExample(() => removeItemisNullOrEmptyArrayExample())" >Remove Items</button>
        <p>
            <strong>Results</strong><br>
            <span id="isNullOrEmpty-array-example-result"></span>
        </p>
    </div>    
    <script>
       let itemsisNullOrEmptyArrayExample = [1,2,3,4,5,6];       
       function getItemsisNullOrEmptyArrayExample() {
            if (utilities.isNullOrEmpty(itemsisNullOrEmptyArrayExample)) {
                executeisNullOrEmptyArrayExample(()=>"[LOG] `items` is null or empty. Returning empty array `[]`...");
                return itemsisNullOrEmptyArrayExample = [];
            }
            return itemsisNullOrEmptyArrayExample;
        }
        function createItemsisNullOrEmptyArrayExample() {
            getItemsisNullOrEmptyArrayExample().push(1,2,3,4,5,6);
            return getItemsisNullOrEmptyArrayExample();
        }
        function clearItemsisNullOrEmptyArrayExample() {
            return itemsisNullOrEmptyArrayExample = undefined;
        }
        function removeItemisNullOrEmptyArrayExample() {
            itemsisNullOrEmptyArrayExample.pop();
            return getItemsisNullOrEmptyArrayExample();
        }
        function executeisNullOrEmptyArrayExample(fn) {
            const el = document.getElementById('isNullOrEmpty-array-example-result');
            const value = fn();
            el.innerText += JSON.stringify(value)+'\n';
        }
        executeisNullOrEmptyArrayExample(() => getItems())
    </script>
</div>

```ts
function getItems(name) {
    const items = dataSource.get(name);
    if (isNullOrEmpty(items)) {
        // return an empty arry regardless.
        // this method is always an Array.
        return [];
    }
    return mapper.map(items);
}
// always has a value. It cannot be null.
const products = getItems('products');
// will never throw an exception
for (const product of products){
    ...
}
```
