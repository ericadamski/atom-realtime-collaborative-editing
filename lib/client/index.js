'use babel';

import { allowUnsafeEval } from 'loophole';

const io = allowUnsafeEval(() => require('socket.io-client'));

export default class Client {
    constructor(username, connection = 'http://localhost:3000') {
        atom.notifications.addInfo(`Connecting to ${connection}`);
        this.socket = io.connect(connection);
        console.log(this.socket);
        this.username = username;
    }
}
