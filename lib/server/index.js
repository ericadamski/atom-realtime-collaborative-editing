'use babel';

import Application from './config';

import {OnConnection} from './handlers/connection';

let app;

export default class Server {
    static create(port) {
        if (!app) {
            app = new Application(port);
            const io = app.setupSocket();

            io.on('connection', OnConnection);
        }

        return app.listen();
    }
}
