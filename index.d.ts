/// <reference types="@types/node" />

declare namespace Queue {
    type id = string|number|symbol;
}

declare class Queue {
    constructor();

    public enqueue(id: Queue.id, value: any): void;
    public dequeue(id: Queue.id): any;
    public dequeueAll(id: Queue.id): Iterator<any>;
    public has(id: Queue.id): boolean;
    public ids(): string[];
    public idLength(id: Queue.id): number;
}

export as namespace Queue;
export = Queue;
