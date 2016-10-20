'use babel';
/* eslint-disable no-undef */

import RealtimeCollaborativeEditingView from './realtime-collaborative-editing-view';
import { CompositeDisposable } from 'atom';

import Server from './server';
import Client from './client';

export default {

    realtimeCollaborativeEditingView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.realtimeCollaborativeEditingView =
        new RealtimeCollaborativeEditingView(state.realtimeCollaborativeEditingViewState,
            atom.workspace.getActiveTextEditor().getTitle(),
            () => {
                Server.teardown();
                this.deactivate();
                atom.notifications.addInfo('Sharing Stopped.');
            });

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

        Server.create()
            .then(() => atom.notifications.addInfo('Sharing.'));

        return (
          this.modalPanel.isVisible() ?
          this.modalPanel.hide() :
          this.modalPanel.show()
        );
    },

    connect() {
        console.log('RealtimeCollaborativeEditing:Connect was toggled!');

        new Client('eric');

        return (
          this.modalPanel.isVisible() ?
          this.modalPanel.hide() :
          this.modalPanel.show()
        );
    },

};
