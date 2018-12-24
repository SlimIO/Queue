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
        queue.dequeue({});
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });
    assert.throws(() => {
        queue.dequeue([]);
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        queue.dequeue("other");
    }, { instanceOf: Error, message: "Unknow queue id other" });
    assert.throws(() => {
        queue.dequeue(10);
    }, { instanceOf: Error, message: "Unknow queue id 10" });
    assert.throws(() => {
        queue.dequeue(Symbol("symbol"));
    }, { instanceOf: Error, message: "Unknow queue id Symbol(symbol)" });
});

avaTest("dequeueAll() throw TypeError | Error", (assert) => {
    const queue = new Queue();
    queue.enqueue("test", 10);

    assert.throws(() => {
        const allDequeue = [...queue.dequeueAll()];
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });
    assert.throws(() => {
        const allDequeue = [...queue.dequeueAll({})];
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });
    assert.throws(() => {
        const allDequeue = [...queue.dequeueAll([])];
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });

    assert.throws(() => {
        const allDequeue = [...queue.dequeueAll("other")];
    }, { instanceOf: Error, message: "Unknow queue id other" });
    assert.throws(() => {
        const allDequeue = [...queue.dequeueAll(10)];
    }, { instanceOf: Error, message: "Unknow queue id 10" });
    assert.throws(() => {
        const allDequeue = [...queue.dequeueAll(Symbol("symbol"))];
    }, { instanceOf: Error, message: "Unknow queue id Symbol(symbol)" });
});

avaTest("has() throw TypeError", (assert) => {
    const queue = new Queue();
    assert.throws(() => {
        queue.has();
    }, { instanceOf: TypeError, message: "id param must be typeof <string|number|Symbol>" });
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

    const ret = queue.enqueue(10, 1);
    assert.is(ret, void 0);

    queue.enqueue(10, 2);
    queue.enqueue(10, 3);
    assert.true(queue.has(10));
    assert.is(queue.idLength(10), 3);

    queue.enqueue("string", "1");
    queue.enqueue("string", "2");
    assert.true(queue.has("string"));
    assert.is(queue.idLength("string"), 2);

    const symbol = Symbol("symbol");
    queue.enqueue(symbol, 4);
    queue.enqueue(symbol, 5);
    assert.true(queue.has(symbol));
    assert.is(queue.dequeue(symbol), 4);

    assert.deepEqual(queue.ids(), [10, "string", symbol]);
});

avaTest("dequeue()", (assert) => {
    const queue = new Queue();

    queue.enqueue(10, 1);
    queue.enqueue(10, 2);
    queue.enqueue(10, 3);

    queue.enqueue("string", "one");
    queue.enqueue("string", "two");
    queue.enqueue("string", "three");

    const symbol = Symbol("symbol");
    queue.enqueue(symbol, 4);
    queue.enqueue(symbol, 5);
    queue.enqueue(symbol, 6);

    assert.is(queue.dequeue(10), 1);
    assert.is(queue.dequeue(10), 2);
    assert.is(queue.dequeue(10), 3);
    assert.is(queue.dequeue(10), null);
    assert.true(queue.idLength(10) === 0);

    assert.is(queue.dequeue("string"), "one");
    assert.is(queue.dequeue("string"), "two");
    assert.is(queue.dequeue("string"), "three");
    assert.true(queue.idLength("string") === 0);

    assert.is(queue.dequeue(symbol), 4);
    assert.is(queue.dequeue(symbol), 5);
    assert.is(queue.dequeue(symbol), 6);
    assert.true(queue.idLength(symbol) === 0);
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
    const sym = Symbol("symbol");
    queue.enqueue("foo", "bar");
    queue.enqueue(100, 200);
    queue.enqueue(sym, "sym");

    assert.is(queue.has("foo"), true);
    assert.is(queue.has(100), true);
    assert.is(queue.has(sym), true);

    assert.is(queue.has("bar"), false);
    assert.is(queue.has(200), false);
    assert.is(queue.has(Symbol("test")), false);
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
