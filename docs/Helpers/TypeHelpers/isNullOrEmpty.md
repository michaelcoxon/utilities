---
layout: default
parent: Type helpers
---

# isNullOrEmpty

This works on objects that implement `Iterable` so it can be used to check if
`Array`s or `string`s are empty or `null`.

```js
if(!isNullOrEmpty(greeting))
{
    greeting = 'Hello';
}
```