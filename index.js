// Require Third-Party Dependencies
const is = require("@slimio/is");

/** @typedef {String|Number|Symbol} keyDef */

/** @type {WeakMap<QueueMap, Map<keyDef, any[]>>} */
const Queues = new WeakMap();

/**
 * @class QueueMap
 */
class QueueMap {
    /**
     * @version 0.1.0
     * @memberof QueueMap#
     * @constructor
     *
     * @example
     * const queue = new Queue();
     */
    constructor() {
        Queues.set(this, new Map());
    }

    /**
     * @version 0.1.0
     *
     * @public
     * @memberof QueueMap#
     * @method enqueue
     * @desc Enqueue data in a queue
     * @param {!keyDef} id key identifier
     * @param {!*} value value to enqueue
     *
     * @throws {TypeError}
     * @returns {void}
     *
     * @example
     * const queue = new Queue();
     *
     * queue.enqueue(100, 1);
     * queue.enqueue(100, 2);
     *
     * queue.enqueue("foo", "bar");
     */
    enqueue(id, value) {
        if (!is.string(id) && !is.number(id) && !is.symbol(id)) {
            throw new TypeError("id param must be typeof <string|number|Symbol>");
        }
        if (is.nullOrUndefined(value)) {
            throw new TypeError("value param must be define");
        }

        const q_ = Queues.get(this);
        if (q_.has(id)) {
            q_.get(id).push(value);
        }
        else {
            q_.set(id, [value]);
        }
    }

    /**
     * @version 0.1.0
     *
     * @public
     * @memberof QueueMap#
     * @method dequeue
     * @desc Dequeue the first data that was enqueued in a queue
     * @param {!keyDef} id key identifier
     *
     * @throws {TypeError|Error}
     * @returns {any}
     *
     * @example
     * const queue = new Queue();
     *
     * queue.enqueue(100, 1);
     * queue.enqueue("foo", "bar");
     *
     * console.log(queue.dequeue(100)); // 1
     * console.log(queue.dequeue("foo")); // "bar"
     */
    dequeue(id) {
        if (!is.string(id) && !is.number(id) && !is.symbol(id)) {
            throw new TypeError("id param must be typeof <string|number|Symbol>");
        }

        const q_ = Queues.get(this);
        if (!q_.has(id)) {
            throw new Error(`Unknow queue id ${id}`);
        }

        const arrRef = q_.get(id);
        if (arrRef.length === 0) {
            return null;
        }

        return arrRef.shift();
    }

    /**
     * @version 0.1.0
     *
     * @public
     * @memberof QueueMap#
     * @method dequeueAll
     * @desc Dequeue all data that was enqueued in a queue
     * @param {!keyDef} id key identifier
     *
     * @throws {TypeError|Error}
     * @returns {Iterator<any>}
     *
     * @example
     * const queue = new Queue();
     *
     * queue.enqueue(100, 1);
     * queue.enqueue(100, 2);
     * queue.enqueue(100, 3);
     *
     * const data = [...queue.dequeueAll(100)];
     * console.log(data); // [1, 2, 3]
     */
    * dequeueAll(id) {
        if (!is.string(id) && !is.number(id) && !is.symbol(id)) {
            throw new TypeError("id param must be typeof <string|number|Symbol>");
        }
        const q_ = Queues.get(this);
        if (!q_.has(id)) {
            throw new Error(`Unknow queue id ${id}`);
        }

        const arrRef = q_.get(id);
        let len = arrRef.length;
        while (len--) {
            yield arrRef.shift();
        }
    }

    /**
     * @version 0.1.0
     *
     * @public
     * @memberof QueueMap#
     * @method ids
     * @desc Get all queues keys
     * @returns {String[]}
     *
     * @example
     * const queue = new Queue();
     *
     * queue.enqueue(100, 1);
     * queue.enqueue("foo", "bar");
     * queue.enqueue("test", 20);
     *
     * console.log(queue.ids()); // [100, "foo", "test"]
     */
    ids() {
        return [...Queues.get(this).keys()];
    }

    /**
     * @version 0.1.0
     *
     * @public
     * @memberof QueueMap#
     * @method idLength
     * @desc Get data length of a queue
     * @param {!keyDef} id id
     *
     * @throws {TypeError|Error}
     * @returns {Number}
     *
     * @example
     * const queue = new Queue();
     *
     * queue.enqueue("test", 20);
     * queue.enqueue("test", 21);
     * queue.enqueue("test", 22);
     *
     * console.log(queue.idLength("test")); // 3
     */
    idLength(id) {
        if (!is.string(id) && !is.number(id) && !is.symbol(id)) {
            throw new TypeError("id param must be typeof <string|number|Symbol>");
        }

        const q_ = Queues.get(this);
        if (!q_.has(id)) {
            throw new Error(`Unknow queue id ${id}`);
        }

        return q_.get(id).length;
    }
}

module.exports = QueueMap;
