
define(function(require) {
  "use strict";
  // INCLUDES
  var KeyBoardManager = 
        require('object-editor-engine/event-manager/KeyboardManager');
	
	/**
	 * Constructor
	 */
	function EventManager() {
		this._canvas = null;
		this._viewModel = null;
		this._keyboard = new KeyBoardManager();
	}
	
	/********************************
	 *     PUBLIC FUNCTIONS         *
	 ********************************/
	EventManager.prototype.step = function(){
		console.log("EventMan - STEP!");
		this._keyboard.step();
	};
	
	EventManager.prototype.setCanvas = function(canvas){
    this._canvas = canvas;
    this._keyboard.setCanvas(canvas);
  };
  
  EventManager.prototype.setViewModel = function(viewModel){
    this._viewModel = viewModel;
    this._keyboard.setViewModel(viewModel);
  };
	/********************************
	 *      PRIVATE FUNCTIONS       *
	 ********************************/
  
	
	
	
	
	/**
	 * End class
	 */
	return EventManager;
});
