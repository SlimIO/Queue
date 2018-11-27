// Require Third-Party Dependencies
const is = require("@slimio/is");

/**
 * @type {WeakMap<QueueMap, Map<String|Number|Symbol, any[]>>}
 */
const Queues = new WeakMap();

/**
 * @class QueueMap
 */
class QueueMap {
    /**
     * @constructor
     */
    constructor() {
        Queues.set(this, new Map());
    }

    /**
     * @memberof #QueueMap
     * @method enqueue
     * @param {!String|Number|Symbol} id key identifier
     * @param {!*} value value to enqueue
     *
     * @throws {TypeError}
     * @returns {void}
     */
    enqueue(id, value) {
        if (!is.nullOrUndefined(id) && !is.string(id) && !is.number(id) && !is.symbol(id)) {
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
     * @memberof #QueueMap
     * @method dequeue
     * @param {!String|Number|Symbol} id key identifier
     *
     * @throws {TypeError}
     * @returns {any}
     */
    dequeue(id) {
        if (!is.nullOrUndefined(id) && !is.string(id) && !is.number(id) && !is.symbol(id)) {
            throw new TypeError("id param must be typeof <string|number|Symbol>");
        }

        const q_ = Queues.get(this);
        if (!q_.has(id)) {
            return null;
        }

        const arrRef = q_.get(id);
        if (arrRef.length === 0) {
            return null;
        }

        return arrRef.shift();
    }

    /**
     * @memberof #QueueMap
     * @method dequeueAll
     * @param {!String|Number|Symbol} id key identifier
     *
     * @throws {TypeError}
     * @returns {Iterator<any>}
     */
    * dequeueAll(id) {
        if (!is.nullOrUndefined(id) && !is.string(id) && !is.number(id) && !is.symbol(id)) {
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
     * @memberof #QueueMap
     * @method ids
     * @returns {String[]}
     */
    ids() {
        return [...Queues.get(this).keys()];
    }

    /**
     * @memberof #QueueMap
     * @method idLength
     * @param {!String|Number|Symbol} id id
     *
     * @throws {TypeError}
     * @returns {Number}
     */
    idLength(id) {
        if (!is.nullOrUndefined(id) && !is.string(id) && !is.number(id) && !is.symbol(id)) {
            throw new TypeError("id param must be typeof <string|number|Symbol>");
        }

        return Queues.get(this).get(id).length;
    }
}

module.exports = QueueMap;
