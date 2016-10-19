'use babel';

import io from 'socket.io-client';

export default class Client {
    constructor(username, connection = 'http://localhost:3000') {
        atom.notifications.addInfo(`Connecting to ${connection}`);
        /*this.socket = io(connection);*/
        this.username = username;
    }
}
