# Queue
![V0.2.1](https://img.shields.io/badge/version-0.2.1-blue.svg)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/Queue/commit-activity)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/SlimIO/Queue/blob/master/LICENSE)
![1DEP](https://img.shields.io/badge/Dependencies-1-yellow.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/SlimIO/Queue/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SlimIO/Queue?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/Queue.svg?branch=master)](https://travis-ci.com/SlimIO/Queue)

SlimIO - Simple Queue system. This package has been created for the SlimIO core and does not aim to be a popular Queue package (it answer our needs).

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/queue
# or
$ yarn add @slimio/queue
```

## Usage exemple

```js
const Queue = require("@slimio/queue");
const queue = new Queue();

queue.enqueue("foo", "bar");
console.log(queue.idLenght("foo")); // 1
console.log(queue.dequeue("foo")); // "bar"
```

## API
```ts
declare namespace Queue {
    type id = string|number|symbol;
}
```

### Queue.enqueue(id: Queue.id, value: any): void;
Enqueue data in a queue
```js
const queue = new Queue();

queue.enqueue(100, 1);
queue.enqueue(100, 2);

queue.enqueue("foo", "bar");
```

### Queue.dequeue(id: Queue.id): any;
Dequeue the first data that was enqueued in a queue
```js
const queue = new Queue();

queue.enqueue(100, 1);
queue.enqueue("foo", "bar");

console.log(queue.dequeue(100)); // 1
console.log(queue.dequeue("foo")); // "bar"
```

### Queue.dequeueAll(id: Queue.id): Iterator<any>;
Dequeue all data that was enqueued in a queue
```js
const queue = new Queue();

queue.enqueue(100, 1);
queue.enqueue(100, 2);
queue.enqueue(100, 3);

const data = [...queue.dequeueAll(100)];
console.log(data); // [1, 2, 3]
```

### Queue.has(id: Queue.id): boolean;
Check if a QueueID exist
```js
const queue = new Queue();

queue.enqueue("foo", "bar");

console.log(queue.has("foo")); // true
console.log(queue.has("fo")); // false
```

### Queue.ids(): string[];
Get all queues keys
```js
const queue = new Queue();

queue.enqueue(100, 1);
queue.enqueue("foo", "bar");
queue.enqueue("test", 20);

console.log(queue.ids()); // [100, "foo", "test"]
```

### Queue.idLength(id: Queue.id): Number;
Return the number of elements of a given QueueID.
```js
const queue = new Queue();

queue.enqueue("test", 20);
queue.enqueue("test", 21);
queue.enqueue("test", 22);

console.log(queue.idLength("test")); // 3
```

## License
MIT
