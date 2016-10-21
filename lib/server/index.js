'use babel';

import Application from './config';

import {OnConnection} from '../handlers/connection';

let app;

export default class Server {
    static create(document, buffer, port = 3000) {
        if (!app) {
            app = new Application(port);
            const io = app.setupSocket();

            io.on('connection', socket => OnConnection(document, buffer, socket));
        }

        return app.listen();
    }

    static teardown() {
        app.close();
        app = undefined;
    }
}
