RealtimeCollaborativeEditingView = require './realtime-collaborative-editing-view'
{CompositeDisposable} = require 'atom'

module.exports = RealtimeCollaborativeEditing =
  realtimeCollaborativeEditingView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @realtimeCollaborativeEditingView = new RealtimeCollaborativeEditingView(state.realtimeCollaborativeEditingViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @realtimeCollaborativeEditingView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'realtime-collaborative-editing:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @realtimeCollaborativeEditingView.destroy()

  serialize: ->
    realtimeCollaborativeEditingViewState: @realtimeCollaborativeEditingView.serialize()

  toggle: ->
    console.log 'RealtimeCollaborativeEditing was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
