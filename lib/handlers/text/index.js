'use babel';

import Document from '../../document';

export default class TextTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.events = [];
        this.buffer.onDidStopChanging(event => this.send(event.changes));
        this.buffer.onWillChange(event => this.events.push(event));

        Document.instance().on('op', op => this.apply(op));
    }

    apply(ops) {
        console.log(ops);
        // apply any operations to the local doc.
        // make sure not to fire the onDidStopChanging.
    }

    send(changes) {
        const r = this.remote([]);

        if (changes) {
            changes.map(change => {
                const event = this.events.shift();
                if (!change.newText) {
                    r.remove(change.start, event.oldText.length);
                } else r.insert(change.start, change.newText);
            });
            const array = r.done();
            const promises = [];
            for (let i = array.length/2; i > 0; i--) {
                const _a = array.splice(0, 2);
                promises.push(new Promise(resolve =>
                    resolve(Document.instance().submitOp(_a))));
            }

            Promise.all(promises)
                .then(messages => console.log(`${messages.length} operations performed`));
        }
    }

    remote(cache) {
        const addToCache = operation => cache.push(operation);

        const move = point => addToCache(this.buffer.characterIndexForPosition(point));

        const remove = (point, count) => {
            move(point);
            addToCache({ d: count });
        };

        const insert = (point, str) => {
            move(point);
            addToCache(str);
        };

        return {
            remove: remove,
            insert: insert,
            done: () => cache,
        };
    }

    local(operation) {
        console.log(operation);
    }
}
