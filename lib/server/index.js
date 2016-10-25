'use babel';

import Application from './config';

import Document from '../document';
import TextTransform from '../handlers/text';
import {OnConnection} from '../handlers/connection';

let app;

export default class Server {
    static create(document, buffer, port = 3000) {
        if (!app) {
            app = new Application(port);
            const io = app.setupSocket();
            Document.create(document.username, document.title, document.content, () => {
                atom.notifications.addInfo('Document created.');
                new TextTransform(buffer);
            });

            io.on('connection', socket => OnConnection(document.title, socket));
        }

        return app.listen();
    }

    static teardown() {
        app.close();
        app = undefined;
    }
}
