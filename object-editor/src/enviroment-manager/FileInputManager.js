
define(function(require) {
  
  "use strict";
  /**
   * Constructor
   */
  function FileInputManager(){
    this.isImageManager = false;
    
    this._onLoadFunc = function (){
        console.log('Info: Load image function not set.');
    };
  }
  
  /********************************
   *       PUBLIC FUNCTIONS       *
   ********************************/
  
  FileInputManager.prototype.setLoadFunction = function (func){
    this._onLoadFunc = func;
  };
  
  FileInputManager.prototype.addElementManagedById = function (elemId){
    document.getElementById(elemId)
        .addEventListener('change', this._loadFile.bind(this), false);
  };
  
  FileInputManager.prototype.addDropTargetElementById = function (elemId){
    document.getElementById(elemId)
        .addEventListener('dragover', this._dragOver.bind(this), false);
    document.getElementById(elemId)
        .addEventListener('drop', this._dropFile.bind(this), false);
  };
  
  FileInputManager.prototype.addElementManagedByRef = function (elem){
    elem.addEventListener('change', this._loadFile.bind(this), false);
  };
  
  FileInputManager.prototype.addDropTargetElementByRef = function (elem){
    elem.addEventListener('dragover', this._dragOver.bind(this), false);
    elem.addEventListener('drop', this._dropFile.bind(this), false);
  };
  
  /********************************
   *       PRIVATE FUNCTIONS      *
   ********************************/

  FileInputManager.prototype._dragOver = function(e){
    var evt = window.event || e;
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };
  
  FileInputManager.prototype._dropFile = function(e){
    var evt = window.event || e;
    evt.stopPropagation();
    evt.preventDefault();
    this._loadFile(evt, evt.dataTransfer.files);
  };
  
  FileInputManager.prototype._loadFile = function(e, files){
    var evt = window.event || e,
        file = null,
        i;
    files = files || evt.target.files;

    for (i = 0; i < files.length; i++){
      file = files[i];
      
      // Image validation
      if (file.name !== '' 
          && !file.type.match('image/*')
          && this.isImageManager) {
        alert(file.name + " is not an image file.");
      }
      
      if (this.isImageManager) { this._manageImg(file);}
      else { this._manageFile(file);}
      
    }

  };
  
  FileInputManager.prototype._manageFile = function (file){
    var lf = this._onLoadFunc,
        reader = null;
    
    reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      lf(evt.target.result);
    };
    reader.onerror = function (evt) {
      alert("error reading file");
    };
  };
  
  FileInputManager.prototype._manageImg = function (file){
    var lf = this._onLoadFunc,
        img = null,
        fileURL = null;
    
    img = new Image();
    
    window.URL = window.URL || window.webkitURL;

    fileURL = window.URL.createObjectURL(file);
    
    img.src = fileURL;
    img.name = file.name;
    
    img.onload = function(ev){
      var evt = window.event || ev;
      lf(evt.target);
    };
  };
  
  
  /**
   * End class
   */
  return FileInputManager;
});
