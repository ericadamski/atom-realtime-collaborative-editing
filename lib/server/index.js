'use babel';

import Application from './config';

let app;

function handleConnection(socket) {
    console.log(socket);
    atom.notifications.addInfo('A new user connected');
}

export default class Server {
    static create(port) {
        if (!app) {
            app = new Application(port);
            const io = app.setupSocket();

            console.log(io);

            io.on('connection', handleConnection);
        }

        return app.listen();
    }
}
