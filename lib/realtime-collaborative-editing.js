'use babel';

import RealtimeCollaborativeEditingView from './realtime-collaborative-editing-view';
import { CompositeDisposable } from 'atom';

/* import Server from './server';*/
/* import Client from './client';*/

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

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
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

        /*Server.create();*/
        atom.notifications.addInfo('yolo');

        return (
          this.modalPanel.isVisible() ?
          this.modalPanel.hide() :
          this.modalPanel.show()
        );
    },

    connect() {
        console.log('RealtimeCollaborativeEditing:Connect was toggled!');

        /*new Client('eric');*/

        return (
          this.modalPanel.isVisible() ?
          this.modalPanel.hide() :
          this.modalPanel.show()
        );
    },

};
