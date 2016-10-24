'use babel';

import Document from '../../document';

export default class TextTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.buffer.onDidStopChanging(event => this.send(event.changes));
        // this.timedBuffer;
    }

    apply(ops) {
        // apply any operations to the local doc.
        // make sure not to fire the onDidStopChanging.
    }

    send(changes) {
        const r = this.remote([]);

        if (changes) {
            changes.map(change => {
                if (!change.newText) {
                    r.remove(change.start, this.buffer.characterIndexForPosition(change.oldExtent));
                } else r.insert(change.start, change.newText);
            });
            Document.instance()
                .submitOp(r.done());
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
            done: () => {
                console.log(cache);
                return cache;
            },
        };
    }

    local(operation) {
        console.log(operation);
    }
}
