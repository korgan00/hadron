
define(function(require) {

  var ObjectEditorEngine = require('object-editor-engine/Engine');
  var FileInputManager = 
            require('object-editor/enviroment-manager/FileInputManager');
  var $ = require('jquery');
  
  /**
   * Constructor
   */
  function EnviromentManager() {
    this._engine = new ObjectEditorEngine();
    this._imgInputManager = new FileInputManager();
    
    this._draggingPanel = null;
    this._offsetPoint = [ 0, 0 ];
    
    this._imageList = {};
    
    this._canvas = null;
  }
  
  /********************
   * PUBLIC FUNCTIONS *
   ********************/
  EnviromentManager.prototype.initialize = function() {
    console.log("Enviroment -> RUN!");
    this._addEventListeners();
    this._canvas = $("#mainCanvas")[0];
    this._engine.initialize(this._canvas);
    this._engine.start();
    
    this._windowResize();
  };
  
  EnviromentManager.prototype.addDragablePanel = function(anchorId, windowId) {
    $('#'+anchorId).mousedown( { panel: $('#'+windowId)}, 
                               this._startDragWindow.bind(this) );
    $(window).mouseup( this._stopDragWindow.bind(this) );
  };
  
  /*********************
   * PRIVATE FUNCTIONS *
   *********************/

  EnviromentManager.prototype._displayMetaPanel = function() {
    $('#objectEditorWrapper').toggleClass('Displayed');
  };

  EnviromentManager.prototype._createNewObject = function() {
    $('#objectEditorWrapper').toggleClass('Displayed');
  };
  
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
  
  EnviromentManager.prototype._addImageSample = function(img) {
    if (this._imageList[img.name]) return;
    
    var ul = document.getElementById("imageSamplesList");
    var li = document.createElement('li');
    var span = document.createElement('span');
    
    ul.appendChild(li);
    li.appendChild(img);
    li.appendChild(span);
    span.appendChild(document.createTextNode(img.name));
    this._imageList[img.name] = img;
  };
  
  EnviromentManager.prototype._windowResize = function(){
    this._canvas.height = window.innerHeight;
    this._canvas.width = window.innerWidth;
    //console.log("height: " + evt.target.innerHeight + " | width: " + evt.target.innerWidth);
  }
  
  EnviromentManager.prototype._addEventListeners = function() {
    document.getElementById('objectEditorCloseButton').
          addEventListener('click', this._displayMetaPanel.bind(this), false);
    document.getElementById('buttonMetadata').
          addEventListener('click', this._displayMetaPanel.bind(this), false);
    document.getElementById('buttonNew').
          addEventListener('click', this._createNewObject.bind(this), false);
    
    this._imgInputManager = new FileInputManager();
    this._imgInputManager.setLoadFunction(this._addImageSample.bind(this));
    this._imgInputManager.addElementManaged('toolsImageInput');
    this._imgInputManager.addDropTargetElement('toolsImageList');
    this._imgInputManager.isImageManager = true;
    
//    document.getElementById('toolsImageInput').
//          addEventListener('change', this._importImages.bind(this), false);
    window.onresize = this._windowResize.bind(this);
  };
  
  
  /**
   * End class
   */
  return EnviromentManager;
});
