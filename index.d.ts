declare namespace Queue {
    type id = string|number|symbol;
}

declare class Queue {
    constructor();

    public enqueue(id: Queue.id, value: any): void;
    public dequeue<T>(id: Queue.id): T;
    public dequeueAll<T>(id: Queue.id): Iterator<T>;
    public has(id: Queue.id): boolean;
    public ids(): string[];
    public idLength(id: Queue.id): number;
}

export as namespace Queue;
export = Queue;
