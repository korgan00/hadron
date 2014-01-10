
define(function(require) {
  "use strict";
  /**
   * Constructor
   */
  function KeyBoardManager() {
    this._canvas = null;
    this._viewModel = null;
    
    this._pressedKeys = [];
  }
  
  /********************************
   *    PUBLIC FUNCTIONS    *
   ********************************/
  KeyBoardManager.prototype.step = function(){
    console.log("EventMan - STEP!");
    var key = '';
    for(key in this._pressedKeys){
      if (this._pressedKeys.hasOwnProperty(key)) {
        switch(key){
          case '87':
            this._viewModel.moveCamera( [0, 10] );
            break;
          case '83':
            this._viewModel.moveCamera( [0, -10] );
            break;
          case '65':
            this._viewModel.moveCamera( [10, 0] );
            break;
          case '68':
            this._viewModel.moveCamera( [-10, 0] );
            break;
        }
      }
    }
  };
  
  KeyBoardManager.prototype.setCanvas = function(canvas){
    this._canvas = canvas;
    document.addEventListener('keydown', this._keyDown.bind(this), false);
    document.addEventListener('keyup', this._keyUp.bind(this), false);
  };
  
  KeyBoardManager.prototype.setViewModel = function(viewModel){
    this._viewModel = viewModel;
  };
  /****************************
   *    PRIVATE FUNCTIONS     *
   ****************************/
  
  KeyBoardManager.prototype._keyDown = function(e) {
    var evt = window.event || e;
    this._pressedKeys[evt.keyCode] = evt.keyCode;
  };
  
  KeyBoardManager.prototype._keyUp = function(e) {
    var evt = window.event || e;
    this._pressedKeys.splice(evt.keyCode, 1);
  };
  
  
  
  /**
   * End class
   */
  return KeyBoardManager;
});
