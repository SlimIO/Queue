const avaTest = require("ava");
const Queue = require("../index.js");

avaTest("enqueue() throw TypeError", (assert) => {
    const queue = new Queue();
    assert.throws(() => {
        queue.enqueue();
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        queue.enqueue({});
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        queue.enqueue(null);
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        queue.enqueue(10);
    }, { instanceOf: TypeError, message: "value param must be define" });
});

avaTest("dequeue() throw TypeError | Error", (assert) => {
    const queue = new Queue();
    queue.enqueue("test", 10);

    assert.throws(() => {
        queue.dequeue();
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        queue.dequeue("other");
    }, { instanceOf: Error, message: "Unknow queue id other" });
});

avaTest("dequeueAll() throw TypeError | Error", (assert) => {
    const queue = new Queue();
    queue.enqueue("test", 10);

    assert.throws(() => {
        const allDequeue = [...queue.dequeueAll()];
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        const allDequeue = [...queue.dequeueAll("other")];
    }, { instanceOf: Error, message: "Unknow queue id other" });
});

avaTest("has() throw TypeError", (assert) => {
    const queue = new Queue();
    assert.throws(() => {
        queue.has([]);
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        queue.has({});
    }, { instanceOf: Error, message: "id param must be typeof <string|number|Symbol>" });
});

avaTest("idLength() throw TypeError | Error", (assert) => {
    const queue = new Queue();
    queue.enqueue("test", 10);

    assert.throws(() => {
        queue.idLength();
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        queue.idLength("other");
    }, { instanceOf: Error, message: "Unknow queue id other" });
});

avaTest("enqueue()", (assert) => {
    const queue = new Queue();

    queue.enqueue(10, 1);
    queue.enqueue(10, 2);
    queue.enqueue(10, 3);

    queue.enqueue("string", "1");
    queue.enqueue("string", "2");
    queue.enqueue("string", "3");

    const symbol = Symbol("symbol");
    queue.enqueue(symbol, 4);
    queue.enqueue(symbol, 5);

    assert.pass();
});

avaTest("dequeue()", (assert) => {
    const queue = new Queue();

    queue.enqueue(10, 1);
    queue.enqueue(10, 2);
    queue.enqueue(10, 3);

    queue.enqueue("string", "1");

    const symbol = Symbol("symbol");
    queue.enqueue(symbol, 4);

    assert.is(queue.dequeue(10), 1);
    assert.is(queue.dequeue(10), 2);
    assert.is(queue.dequeue(10), 3);
    assert.is(queue.dequeue(10), null);

    assert.is(queue.dequeue("string"), "1");

    assert.is(queue.dequeue(symbol), 4);
});

avaTest("dequeueAll()", (assert) => {
    const queue = new Queue();

    queue.enqueue("test", 1);
    queue.enqueue("test", "2");
    queue.enqueue("test", 3);

    const allDequeue = [...queue.dequeueAll("test")];
    assert.deepEqual(allDequeue, [1, "2", 3]);

    const empty = [...queue.dequeueAll("test")];
    assert.deepEqual(empty, []);
});

avaTest("has()", (assert) => {
    const queue = new Queue();
    queue.enqueue("foo", "bar");
    queue.enqueue(100, 200);

    assert.is(queue.has("foo"), true);
    assert.is(queue.has(100), true);
});


avaTest("ids()", (assert) => {
    const queue = new Queue();

    queue.enqueue("number", 1);
    queue.enqueue("string", "1");
    queue.enqueue("Symbol", Symbol(1));
    const ids = queue.ids();
    assert.deepEqual(ids, ["number", "string", "Symbol"]);
});

avaTest("idLength()", (assert) => {
    const queue = new Queue();

    queue.enqueue("test", 1);
    queue.enqueue("test", 2);

    let ids = queue.idLength("test");
    assert.is(ids, 2);

    queue.dequeue("test");
    queue.dequeue("test");

    ids = queue.idLength("test");
    assert.is(ids, 0);

    queue.dequeue("test");

    ids = queue.idLength("test");
    assert.is(ids, 0);

    queue.enqueue("test", 1);
    queue.enqueue("test", 2);
    queue.enqueue("test", 3);

    ids = queue.idLength("test");
    assert.is(ids, 3);
});
