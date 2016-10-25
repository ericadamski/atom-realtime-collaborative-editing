'use babel';
/* eslint-disable no-undef */

const os = require('os');
const path = require('path');

import RealtimeCollaborativeEditingView from './realtime-collaborative-editing-view';
import { CompositeDisposable } from 'atom';

import Server from './server';
import Client from './client';

export default {

    realtimeCollaborativeEditingView: null,
    modalPanel: null,
    subscriptions: null,

    config: {
        username: {
            type: 'string',
            title: 'Username',
            description: 'The namespace for your documents.',
            default: path.basename(os.homedir()),
        },
    },

    activate(state) {
        this.realtimeCollaborativeEditingView =
        new RealtimeCollaborativeEditingView(state.realtimeCollaborativeEditingViewState,
            atom.workspace.getActiveTextEditor().getTitle(),
            () => this.stop());

        this.modalPanel = atom.workspace.addHeaderPanel({
            item: this.realtimeCollaborativeEditingView.getElement(),
            visible: false,
            priority: 1000000,
        });

        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(
            atom.commands.add('atom-workspace',
                {'realtime-collaborative-editing:connect': () => this.connect()}),
            atom.commands.add('atom-workspace',
                {'realtime-collaborative-editing:collaborate': () => this.share()}),
        );
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.realtimeCollaborativeEditingView.destroy();
    },

    serialize() {
        return {realtimeCollaborativeEditingViewState: this.realtimeCollaborativeEditingView.serialize()};
    },

    share() {
        console.log('RealtimeCollaborativeEditing:share was toggled!');
        const editor = atom.workspace.getActiveTextEditor();

        Server.create({
            title: editor.getTitle(),
            username: atom.config.get('realtime-collaborative-editing').username,
            content: editor.getText(),
        }, editor.getBuffer()).then(() => atom.notifications.addInfo('Sharing.'));

        return this.modalPanel.show();
    },

    connect() {
        console.log('RealtimeCollaborativeEditing:Connect was toggled!');

        const client = new Client(atom.config.get('realtime-collaborative-editing').username);

        client.socket.on('set-title', message => {
            atom.workspace.open(message.title);
            this.realtimeCollaborativeEditingView.setTitle(message.title);
            client.connect(message.title);
        });

        return this.modalPanel.show();
    },

    stop() {
        if (Server) Server.teardown();
        this.serialize();
        this.modalPanel.hide();
        atom.notifications.addInfo('Sharing Stopped.');
    },
};
