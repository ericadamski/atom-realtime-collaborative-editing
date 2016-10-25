'use babel';

import { allowUnsafeEval } from 'loophole';
import Document from '../document';

const io = allowUnsafeEval(() => require('socket.io-client'));

export default class Client {
    constructor(username, connection = 'http://localhost:3000') {
        atom.notifications.addInfo(`Connecting to ${connection}`);
        this.socket = io.connect(connection);
        this.username = username;
    }

    connect(title) {
        this.document = Document
            .connect(this.socket)
            .get(`atom:${this.username}`, title);

        console.log(this.document);
        console.log(title);

        this.document.subscribe(console.log);

        this.document.on('op', console.log);
    }
}
