'use babel';

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

        return _share;
    }

    static instance() {
        console.log(_document);
        console.log(_document.type);
        return _document;
    }

    static connect(socket) {
        return new shareDB.Connection(socket);
    }

    static close(next) {
        _share.close(next);
    }
}
