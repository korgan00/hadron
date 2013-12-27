
define(function(require) {
	// INCLUDES
	var ViewModel = require('object-editor-engine/ViewModel');
	
	/**
	 * Constructor
	 */
	function Render() {
		
	}
	
	/********************************
	 * 		PUBLIC FUNCTIONS 		*
	 ********************************/
	
	Render.prototype.step = function(){
		console.log("Render  - STEP!");
	};
	/********************************
	 * 		PRIVATE FUNCTIONS 		*
	 ********************************/

	
	
	
	
	
	/**
	 * End class
	 */
	return Render;
});
