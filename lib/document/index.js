'use babel';

const Duplex = require('stream').Duplex;
const ShareDB = require('sharedb');
const shareDB = require('sharedb/lib/client');
const types = require('sharedb/lib/types');
const ottext= require('ot-text');
types.register(ottext.type);

const _share = new ShareDB();

let _document;

function createStream(socket) {
    const stream = new Duplex();

    stream.headers = socket.handshake.headers;
    stream.remoteAddress = socket.conn.remoteAddress;

    stream._write = (op, encoding, next) => write(socket, op, encoding, next);
    stream._read = read;

    stream.on('error', args => console.log(`Error: ${args}`));
    stream.on('end', () => socket.disconnect());

    socket.on('message', op => {
        console.log(`Received OP : ${op}`);
        stream.push(op);
    });

    socket.on('close', () => {
        stream.push(null);
        stream.emit('close');
        stream.emit('end');
        stream.end();
    });

    return stream;
}

function write(socket, op, encoding, next) {
    console.log(op);
    socket.send(op, next);
}

function read(op) {
    //
}

export default class Document {
    static create(username, title, content, next) {
        const connection = _share.connect();
        _document = connection.get(`atom:${username}`, title);

        _document.fetch(err => {
            if (err) throw err;
            if (_document.type === null)
                return _document.create(content, ottext.type.name, next);
            next();
        });

        return this;
    }

    static listen(socket) {
        _share.listen(createStream(socket));
    }

    static instance() {
        return _document;
    }

    static connect(username, title, socket) {
        const shareClient = new shareDB.Connection(socket);

        _document = shareClient.get(`atom:${username}`, title);

        console.log(_document);

        _document.subscribe(error => {
            if (error) console.log(`Failed to connect ${error}.`);
            else console.log(_document);
        });

        return _document;
    }

    static close(next) {
        _share.close(next);
    }
}
