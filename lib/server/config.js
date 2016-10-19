'use babel';
/* eslint-disable no-magic-numbers */

import express from 'express';
import http from 'http';
import io from 'socket.io';

let server;

export default class Application {
    constructor(port = 3000) {
        this.port = port;
        this.app = express();
    }

    instance() {
        if (!server) {
            server = http.Server(this.app);
        }

        return server;
    }

    listen() {
        return new Promise(resolve => server.listen(this.port, resolve));
    }

    setupSocket() {
        return this.socket = io(server);
    }
}
