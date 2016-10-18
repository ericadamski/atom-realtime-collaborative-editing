'use babel';

import RealtimeCollaborativeEditingView from './realtime-collaborative-editing-view';
import { CompositeDisposable } from 'atom';

export default {

  realtimeCollaborativeEditingView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.realtimeCollaborativeEditingView = new RealtimeCollaborativeEditingView(state.realtimeCollaborativeEditingViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.realtimeCollaborativeEditingView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'realtime-collaborative-editing:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.realtimeCollaborativeEditingView.destroy();
  },

  serialize() {
    return {
      realtimeCollaborativeEditingViewState: this.realtimeCollaborativeEditingView.serialize()
    };
  },

  toggle() {
    console.log('RealtimeCollaborativeEditing was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
