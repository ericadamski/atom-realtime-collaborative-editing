'use babel';

const Duplex = require('stream').Duplex;
const ShareDB = require('sharedb');
const shareDB = require('sharedb/lib/client');
const types = require('sharedb/lib/types');
const ottext= require('ot-text');
types.register(ottext.type);

const _share = new ShareDB();

let _document;

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

    static on(handler) {
        _document.on('op', handler);
    }

    static listen(socket) {
        // console.log(socket);
        // const stream = new Duplex();
        //
        // stream._write = (op, encoding, next) => {
        //     socket.send(op);
        //     next();
        // };
        //
        // stream._read = () => {};
        //
        // stream.on('error', console.log);
        // stream.on('end', () => {
        //     socket.close();
        // });
        //
        // socket.on('message', op => {
        //     console.log(op);
        //     stream.push(op);
        // });
        // socket.on('close', op => {
        //     stream.push(null);
        //     stream.emit('close');
        //     stream.emit('end');
        //     stream.end();
        // });
        // stream.remoteAddress = socket.
        _share.listen(socket);
    }

    static instance() {
        return _document;
    }

    static connect(socket) {
        return new shareDB.Connection(socket);
    }

    static close(next) {
        _share.close(next);
    }
}
