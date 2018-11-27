/// <reference types="@types/node" />

declare namespace Queue {
    type queueKey = string|number|symbol;
    type Queues = WeakMap<QueueMap, Map<keyDef, any[]>>;

    declare class QueueMap {
        constructor();

        public enqueue(id: queueKey, value: any);
        public dequeue(id: queueKey): any;
        public dequeueAll(id: queueKey): Iterator<any>;
        public ids(): string[];
        public idLength(id: queueKey): number;
    }
}

export as namespace Queue;
export = Queue;
