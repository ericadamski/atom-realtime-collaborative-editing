'use babel';

import Application from './config';

let app;

export default class Server {
    static create(port) {
        if (!app) {
            app = new Application(port);
            const io = app.setupSocket();

            io.on('connection', this.handleConnection);
        }

        return app;
    }

    handleConnection(socket) {
        atom.notifications.addInfo('A new user connected');
    }
}
