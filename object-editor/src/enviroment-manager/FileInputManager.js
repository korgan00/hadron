
define(function(require) {
  
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
  // ImageImporter.prototype.
  
  FileInputManager.prototype.setLoadFunction = function (func){
    this._onLoadFunc = func;
  };
  
  FileInputManager.prototype.addElementManaged = function (elemId){
    document.getElementById(elemId)
        .addEventListener('change', this._loadFile.bind(this), false);
  };
  
  FileInputManager.prototype.addDropTargetElement = function (elemId){
    document.getElementById(elemId)
        .addEventListener('dragover', this._dragOver.bind(this), false);
    document.getElementById(elemId)
        .addEventListener('drop', this._dropFile.bind(this), false);
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
    var evt = window.event || e;
    var files = files || evt.target.files;
    var file = null;
    var fileURL = null

    for (var i = 0; i < files.length; i++){
      file = files[i];
      
      // Image validation
      if (file.type !== '' 
          && !file.type.match('image/*')
          && this.isImageManager) 
        alert(file.name + " is not an image file.");
  
      window.URL = window.URL || window.webkitURL;
  
      fileURL = window.URL.createObjectURL(file);
      
      var lf = this._onLoadFunc;
      var img = new Image();
      img.src = fileURL;
      img.name = file.name;
      
      img.onload = function(){
          lf(this);
      };
    }

  };
  
  /**
   * End class
   */
  return FileInputManager;
});
