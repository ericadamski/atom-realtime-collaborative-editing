'use babel';

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
        new RealtimeCollaborativeEditingView(state.realtimeCollaborativeEditingViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.realtimeCollaborativeEditingView.getElement(),
            visible: false,
        });

        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(
            atom.commands.add('atom-workspace',
                {'realtime-collaborative-editing:connect': () => this.connect()}),
            atom.commands.add('atom-workspace',
                {'realtime-collaborative-editing:serve': () => this.serve()}),
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

    serve() {
        console.log('RealtimeCollaborativeEditing:Serve was toggled!');

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
