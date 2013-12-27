
define(function(require) {
	// INCLUDES
	var Model = require('object-editor-engine/Model');
	
	/**
	 * Constructor
	 */
	function ViewModel() {
		this.model = new Model();
	}
	
	/********************************
	 * 		PUBLIC FUNCTIONS 		*
	 ********************************/
	ViewModel.prototype.step = function(){
		this.model.step();
		console.log("ViewModel - STEP!");
	};
	/********************************
	 * 		PRIVATE FUNCTIONS 		*
	 ********************************/

	
	
	
	
	
	/**
	 * End class
	 */
	return ViewModel;
});
