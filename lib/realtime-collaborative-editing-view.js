'use babel';

import {$} from 'atom-space-pen-views';

export default class RealtimeCollaborativeEditingView {

    constructor(serializedState, title, close) {
        this.element = document.createElement('div');
        this.element.classList.add('realtime-collaborative-editing');

        const $title = document.createElement('strong');
        $title.textContent = title;
        $title.classList.add('document-title');

        this.setTitle = t => $title.textContent = t;

        const $close = document.createElement('span');
        $close.classList.add('icon-x', 'close');
        $($close).on('mouseup', close);
        this.element.appendChild($close);

        const $broadcastIcon = document.createElement('span');
        $broadcastIcon.classList.add('icon-broadcast');

        const $pulse = document.createElement('div');
        $pulse.classList.add('left-icon');
        $pulse.appendChild($broadcastIcon);


        const sharing = document.createElement('div');
        sharing.textContent = `Currently collaborating on`;
        sharing.appendChild($title);
        sharing.classList.add('is-sharing');
        this.element.appendChild($pulse);
        this.element.appendChild(sharing);
    }


    serialize() {}


    destroy() {
        this.element.remove();
    }

    getElement() {
        return this.element;
    }

}
