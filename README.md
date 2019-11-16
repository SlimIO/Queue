# Queue
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/Queue/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/Queue/commit-activity)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/SlimIO/Queue/blob/master/LICENSE)
![dep](https://img.shields.io/badge/Dependencies-1-yellow.svg)
![size](https://img.shields.io/bundlephobia/min/@slimio/queue.svg?style=flat)
[![Known Vulnerabilities](https://snyk.io/test/github/SlimIO/Queue/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SlimIO/Queue?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/Queue.svg?branch=master)](https://travis-ci.com/SlimIO/Queue)
[![Greenkeeper badge](https://badges.greenkeeper.io/SlimIO/Queue.svg)](https://greenkeeper.io/)

SlimIO - Simple Queue system. This package has been created for the SlimIO core and does not aim to be a popular Queue package (it answer our needs).

## What is it ?
If you do not know what a queue is, please read the following [wikipedia page](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)).

## Requirements
- [Node.js](https://nodejs.org/en/) v10 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/queue
# or
$ yarn add @slimio/queue
```

## Usage example

```js
const Queue = require("@slimio/queue");
const queue = new Queue();

queue.enqueue("foo", "bar");
console.log(queue.idLenght("foo")); // 1
console.log(queue.dequeue("foo")); // "bar"
```

## API
An id is described by the following type: `string|number|symbol`. All following API are methods of Queue class.

<details><summary>enqueue(id, value: any): void</summary>
<br />

Enqueue data in a given queue (identified by his id).
```js
const { deepStrictEqual } = require("assert");
const q = new Queue();
const sym = Symbol("foo");

q.enqueue(sym, 1);
q.enqueue(sym, 2);

const queueData = [...q.dequeueAll(sym)];
deepStrictEqual(queueData, [1, 2]);
```
</details>

<details><summary>dequeue(id): any</summary>
<br />

Dequeue the first data that was enqueued in the given queue id. A **null** value is returned when there is no data in the queue!
```js
const { strictEqual } = require("assert");
const q = new Queue();

q.enqueue(100, 1);
q.enqueue("foo", "bar");

strictEqual(q.dequeue(100), 1);
strictEqual(q.dequeue("foo"), "bar");
strictEqual(q.dequeue("foo"), null);
```
</details>

<details><summary>dequeueAll(id): Iterator< any ></summary>
<br />

Dequeue all data that was enqueued in the given queue id. The returned value is a JavaScript iterator, no data will be lost if the iterator is stoped.
```js
const { deepStrictEqual } = require("assert");
const q = new Queue();

q.enqueue("test", 1);
q.enqueue("test", 2);
q.enqueue("test", 3);

const queueData = [...q.dequeueAll(100)];
deepStrictEqual(queueData, [1, 2, 3]);
```
</details>

<details><summary>has(id): boolean</summary>
<br />

Check if a given queue id exist!
```js
const { strictEqual } = require("assert");
const q = new Queue();

q.enqueue("foo", null);

strictEqual(q.has("foo"), true);
strictEqual(q.has("fo"), false);
```
</details>

<details><summary>ids(): string[]</summary>
<br />

Get all registered queue ids.
```js
const { deepStrictEqual } = require("assert");
const q = new Queue();

q.enqueue(100, 1);
q.enqueue("foo", "bar");
q.enqueue("test", 20);

const ids = q.ids();
deepStrictEqual(ids, [100, "foo", "test"]);
```
</details>

<details><summary>idLength(id): number</summary>
<br />

Return the number of elements of a given queue id.
```js
const { strictEqual } = require("assert");
const q = new Queue();

q.enqueue("test", 20);
q.enqueue("test", 21);
q.enqueue("test", 22);

const len = queue.idLength("test");
strictEqual(len, 3);
```
</details>

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[@slimio/is](https://github.com/SlimIO/is#readme)|Minor|Low|Type Checker|


## License
MIT
