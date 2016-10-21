'use babel';

import Document from '../document';
import TextTransform from './text';

export function OnConnection(document, buffer, socket) {
    // document = { username:string, title:string, content:string };
    require('./text');
    Document.create(document.username, document.title, document.content, () => {
        atom.notifications.addInfo('Document created.');
        new TextTransform(buffer);
    }).listen(socket);
}
