---
layout: default
parent: Helpers
---

# Type helpers
{: .no_toc }

There are a few type helpers to assert object states. These type helpers work
with the type engine in TypeScript to ensure that you are using the correct type.

{% include article-toc.md %}

## isNullOrEmpty

This works on objects that implement `Iterable` so it can be used to check if
`Array`s or `string`s are empty or `null`.

```js
if(!isNullOrEmpty(greeting))
{
    greeting = 'Hello';
}
```