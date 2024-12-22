
<div style="display: flex; margin-top: 50px; max-width: 700px;">

<div style="flex: 0 0 150px;">
<div style="position: fixed; max-width: 150px;">

[Description](#promises)<br>

**Class**<br>
[Instance Properties](#instance-properties)<br>
[Instance Methods](#instance-methods)<br>

**Nodes**<br>
[\<Promise />](#promise)<br>
[\<Promise.Resolver />](#promiseresolver)<br>
[\<Promise.Task />](#promisetask)<br>

[Examples](#examples)<br>

</div></div>

<div style="flex: 1 1">

# Promises

This is a Promise-like implementation for Roku/Brightscript, designed to match the syntax and functionality of the [ECMA/ES6 specification](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects) (see also: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)).

The `Promise` object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

## Description

A `Promise` is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

A Promise is in one of these states:

- _pending_: initial state, neither fulfilled nor rejected.
- _fulfilled_: meaning that the operation was completed successfully.
- _rejected_: meaning that the operation failed.

The eventual state of a pending promise can either be _fulfilled_ with a value or _rejected_ with a reason (error). When either of these options occur, the associated handlers queued up by a promise's `then` method are called. If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.

A promise is said to be _settled_ if it is either fulfilled or rejected, but not pending.

You will also hear the term _resolved_ used with promises — this means that the promise is settled or "locked-in" to match the eventual state of another promise, and further resolving or rejecting it has no effect.

## Chained Promises

The promise methods `then()`, `catch()`, and `finally()` are used to associate further action with a promise that becomes settled.

# Class

## Instance Properties

## Instance Methods

# Nodes

The `<Promise />`, `<Promise.Resolver />`, and `<Promise.Task />` nodes are necessitated by the Roku Brightscript language's approach to multi-threading.

- `<Promise />` is used to serialize a promise into a node, which can then be transferred across node boundaries.
- `<Promise.Resolver />` encapsulates arbitrary asynchronous code.
- `<Promise.Task />` is a pooled task that is optimized for use with Promises.
- `<Promise.TaskPool />`

## `<Promise />`

The `<Promise />`

## `<Promise.Resolver />`

## `<Promise.Task />`

# Examples

</div></div>
