'use babel';

import TextTransform from '../handlers/text';
import { allowUnsafeEval } from 'loophole';
import Document from '../document';

const io = allowUnsafeEval(() => require('socket.io-client'));

export default class Client {
    constructor(username, connection = 'http://localhost:3000') {
        atom.notifications.addInfo(`Connecting to ${connection}`);
        this.socket = io.connect(`${connection}/docs`);

        this.socket.on('connect', args => console.log(args));

        this.username = username;
    }

    connect(title, buffer) {
        this.document = Document.connect(this.username, title, this.socket);

        this.tt = new TextTransform(buffer);

        console.log(this.document);

        this.document.on('op', op => console.log(`this is the op : ${op}`));
    }
}
