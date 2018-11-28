# Queue

SlimIO - Simple Queue system

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
> `type queueKey = string|number|symbol;`

### Queue.enqueue(id: queueKey, value: any): void;
Enqueue data in a queue
```js
const queue = new Queue();

queue.enqueue(100, 1);
queue.enqueue(100, 2);

queue.enqueue("foo", "bar");
```

### Queue.dequeue(id: queueKey): any;
Dequeue the first data that was enqueued in a queue
```js
const queue = new Queue();

queue.enqueue(100, 1);
queue.enqueue("foo", "bar");

console.log(queue.dequeue(100)); // 1
console.log(queue.dequeue("foo")); // "bar"
```

### Queue.dequeueAll(id: queueKey): Iterator<any>;
Dequeue all data that was enqueued in a queue
```js
const queue = new Queue();

queue.enqueue(100, 1);
queue.enqueue(100, 2);
queue.enqueue(100, 3);

const data = [...queue.dequeueAll(100)];
console.log(data); // [1, 2, 3]
```

### Queue.ids(): string[];
Dequeue all data that was enqueued in a queue
```js
const queue = new Queue();

queue.enqueue(100, 1);
queue.enqueue("foo", "bar");
queue.enqueue("test", 20);

console.log(queue.ids()); // [100, "foo", "test"]
```
### Queue.ids(): string[];
Dequeue all data that was enqueued in a queue
```js
const queue = new Queue();

queue.enqueue("test", 20);
queue.enqueue("test", 21);
queue.enqueue("test", 22);

console.log(queue.idLength("test")); // 3
```

## LICENCE
MIT