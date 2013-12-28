
define(function(require) {
  
  var ObjectEditorEngine = require('object-editor-engine/Engine');
  var $ = require('jquery');
  
  /**
   * Constructor
   */
  function EnviromentManager() {
    this._engine = new ObjectEditorEngine();
    
    this._draggingPanel = null;
    this._offsetPoint = [ 0, 0 ];
    
  }
  
  /********************
   * PUBLIC FUNCTIONS *
   ********************/
  EnviromentManager.prototype.initialize = function() {
    console.log("Enviroment -> RUN!");
    this._addEventListeners();
    // this.engine.initialize();
    // this.engine.start();
  };
  
  EnviromentManager.prototype.addDragablePanel = function(anchorId, windowId) {
    $('#'+anchorId).mousedown( { panel: $('#'+windowId)}, 
                               this._startDragWindow.bind(this) );
    $(window).mouseup( this._stopDragWindow.bind(this) );
  };
  
  EnviromentManager.prototype.displayMetaPanel = function() {
    $('#objectEditorWrapper').toggleClass('Displayed');
  };
  
  /*********************
   * PRIVATE FUNCTIONS *
   *********************/
  
  EnviromentManager.prototype._startDragWindow = function(evt) {
    //var evt = window.event || e;
    var rect;
    this._draggingPanel = evt.data.panel;
    $(window).mousemove(this._dragWindow.bind(this));
    
    rect = this._draggingPanel.offset();
    this._offsetPoint[X] = evt.clientX - rect.left;
    this._offsetPoint[Y] = evt.clientY - rect.top;
  };
  
  EnviromentManager.prototype._dragWindow = function(evt) {
    var div = this._draggingPanel;
    var pos = [];
    
    if (div !== null) {
      div.css('position', 'absolute');
      pos[0] = evt.clientX - this._offsetPoint[X];
      pos[1] = evt.clientY - this._offsetPoint[Y];
      div.css('left', pos[0] < 0? 0: pos[0]);
      div.css('top', pos[1] < 0? 0: pos[1]);
    }
  };
  
  EnviromentManager.prototype._stopDragWindow = function() {
    this._draggingPanel = null;
    $(window).off('mousemove');
  };

  EnviromentManager.prototype._addEventListeners = function() {
    document.getElementById('objectEditorCloseButton').
          addEventListener('click', this.displayMetaPanel.bind(this), false);
  }
  /**
   * End class
   */
  return EnviromentManager;
});
