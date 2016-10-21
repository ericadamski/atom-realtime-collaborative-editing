'use babel';

export default class TextTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.buffer.onDidStopChanging(event => this.send(event.changes));
        // this.buffer.onDidInsertText(this.send);
    }

    apply(ops) {
        // apply any operations to the local doc.
        // make sure not to fire the onDidStopChanging.
    }

    send(changes) {
        console.log(changes, this);
        // do the actual send.
        // const remote = this.remote([]);

        if (changes) {
            changes.map(change => {
                if (!change.newText) {
                    this.buffer.characterIndexForPosition(change.oldExtend);
                    console.log(`Deleting ? many chars starting at ${this.buffer.characterIndexForPosition(change.start)}`);
                } else {
                    console.log(`Inserting ${change.newText} at position ${this.buffer.characterIndexForPosition(change.start)}`);
                }
            })
        }

        // foreach op in event do
        // on insert remote.insert
        // on delete remote.delete
        // then remote.done
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
            done: cache,
        };
    }

    local(operation) {
        console.log(operation);
    }
}
