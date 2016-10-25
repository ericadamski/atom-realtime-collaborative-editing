'use babel';

import Document from '../document';

export function OnConnection(title, socket) {
    Document.listen(socket);
    socket.emit('set-title', { title: title });
}
