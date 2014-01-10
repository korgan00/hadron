
define(
/**
 * @returns EnviromenManager
 */
function (require) {

  var ObjectEditorEngine = require('object-editor-engine/Engine'),
      FileInputManager = 
            require('object-editor/enviroment-manager/FileInputManager'),
      $ = require('jquery');
  /** 
   * @type EnviromentManager
   * @constructor 
   */
  function EnviromentManager() {
    this._engine = new ObjectEditorEngine();
    this._imgInputManager = new FileInputManager();
    this._objInputManager = new FileInputManager();
    
    this._draggingPanel = null;
    this._offsetPoint = [ 0, 0 ];
    
    this._imageList = {};
    this._canvas = null;
  }
  
  /********************
   * PUBLIC FUNCTIONS *
   ********************/
  /**
   * @memberOf EnviromentManager
   */
  EnviromentManager.prototype.initialize = function () {
    console.log("Enviroment -> RUN!");
    this._canvas = $("#mainCanvas")[0];
    
    this._addEventListeners();
    this._engine.initialize(this._canvas);
    this._engine.start();
    
    this._windowResize();
  };
  
  /**
   * @memberOf EnviromentManager
   */
  EnviromentManager.prototype.addDragablePanel = function (anchorId, windowId) {
    $('#'+anchorId).mousedown({ panel: $('#' + windowId) },
                              this._startDragWindow.bind(this));
    $(window).mouseup(this._stopDragWindow.bind(this));
  };
  
  /*********************
   * PRIVATE FUNCTIONS *
   *********************/

  EnviromentManager.prototype._displayMetaPanel = function () {
    $('#objectEditorWrapper').toggleClass('Displayed');
  };

  EnviromentManager.prototype._createNewObject = function () {
    $('#objectEditorWrapper').toggleClass('Displayed');
  };
  
  EnviromentManager.prototype._openObjectFile = function () {
    var input = document.getElementById("menuOptFileOpenInput");
    input.click();
  };
  EnviromentManager.prototype._openImageFile = function () {
    var input = document.getElementById("toolsImageInput");
    input.click();
  };

  EnviromentManager.prototype._startDragWindow = function (evt) {
    //var evt = window.event || e;
    var rect;
    this._draggingPanel = evt.data.panel;
    $(window).mousemove(this._dragWindow.bind(this));
    
    rect = this._draggingPanel.offset();
    this._offsetPoint[X] = evt.clientX - rect.left;
    this._offsetPoint[Y] = evt.clientY - rect.top;
  };
  
  EnviromentManager.prototype._dragWindow = function (evt) {
    var div = this._draggingPanel;
    var pos = [];
    
    if (div !== null) {
      div.css('position', 'absolute');
      pos[0] = evt.clientX - this._offsetPoint[X];
      pos[1] = evt.clientY - this._offsetPoint[Y];
      div.css('left', pos[0] < 0 ? 0 : pos[0]);
      div.css('top', pos[1] < 0 ? 0 : pos[1]);
    }
  };
  
  EnviromentManager.prototype._stopDragWindow = function () {
    this._draggingPanel = null;
    $(window).off('mousemove');
  };
  
  EnviromentManager.prototype._addImageSample = function (img) {
    var ul = document.getElementById("imageSamplesList"),
        li = document.createElement('li'),
        span = document.createElement('span');
    
    if (this._imageList[img.name]) { 
      return; 
    }
    
    
    ul.appendChild(li);
    li.appendChild(img);
    li.appendChild(span);
    span.appendChild(document.createTextNode(img.name));
    this._imageList[img.name] = img;
  };
  
  EnviromentManager.prototype._loadObjectByFile = function (obj) {
    var r = confirm("You will lose all unsaved progress...");
    if (r) alert("Has dicho si pero no esta manejado, joete!");
    else alert("Has dicho no pero tampoco esta manejado, joete!");
    console.log(obj);
  };
  
  EnviromentManager.prototype._windowResize = function () {
    this._canvas.height = window.innerHeight;
    this._canvas.width = window.innerWidth;
    //console.log("height: " + evt.target.innerHeight + " | width: " + evt.target.innerWidth);
  };
  
  EnviromentManager.prototype._addEventListeners = function() {
    document.getElementById('objectEditorCloseButton').
          addEventListener('click', this._displayMetaPanel.bind(this), false);
    document.getElementById('buttonMetadata').
          addEventListener('click', this._displayMetaPanel.bind(this), false);
    document.getElementById('menuOptFileNew').
          addEventListener('click', this._createNewObject.bind(this), false);
    document.getElementById('menuOptFileOpen').
          addEventListener('click', this._openObjectFile.bind(this), false);
    document.getElementById('toolsImageFakeInput').
          addEventListener('click', this._openImageFile.bind(this), false);
    
    this._imgInputManager.setLoadFunction(this._addImageSample.bind(this));
    this._imgInputManager.addElementManagedById('toolsImageInput');
    this._imgInputManager.addDropTargetElementById('toolsImageList');
    this._imgInputManager.isImageManager = true;

    this._objInputManager.setLoadFunction(this._loadObjectByFile.bind(this));
    this._objInputManager.addElementManagedById('menuOptFileOpenInput');
    this._objInputManager.addDropTargetElementByRef(window);
    this._objInputManager.isImageManager = false;
    
    window.onresize = this._windowResize.bind(this);
  };
  
  
  /**
   * End class
   */
  return EnviromentManager;
});
