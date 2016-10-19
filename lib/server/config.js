'use babel';
/* eslint-disable no-magic-numbers */


import { allowUnsafeEval } from 'loophole';
import http from 'http';

const express = allowUnsafeEval(() => require('express'));
const io = allowUnsafeEval(() => require('socket.io'));

let server;

export default class Application {
    constructor(port = 3000) {
        this.port = port;
        this.app = express();

        this.app.use('/', require('./routes'));
    }

    instance() {
        if (!server) {
            server = http.Server(this.app);
        }

        return server;
    }

    listen() {
        return new Promise(resolve => this.instance().listen(this.port, resolve));
    }

    setupSocket() {
        return this.socket = io(this.instance());
    }
}
