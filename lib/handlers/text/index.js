'use babel';

// const buffer = atom.workspace
//     .getActiveTextEditor()
//     .getBuffer();

class TextTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.buffer.onDidStopChanging(this.send);
    }

    apply(ops) {
        // apply any operations to the local doc.
        // make sure not to fire the onDidStopChanging.
    }

    send(event) {
        console.log(event);
        // do the actual send.
        const remote = this.remote([]);

        // foreach op in event do
        // on insert remote.insert
        // on delete remote.delete
        // then remote.done
    }

    remote(cache) {
        const addToCache = operation => cache.push(operation);

        const move = point => addToCache(buffer.characterIndexForPosition(point));

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

export { TextTransform };
