
define(function(require) {
  "use strict";
	// INCLUDES
	var Model = require('object-editor-engine/Model');
	
	/**
	 * Constructor
	 */
	function ViewModel() {
		this.model = new Model();
		
		this.cameraPosition = [ 0, 0 ];
	}
	
	/********************************
	 *       PUBLIC FUNCTIONS       *
	 ********************************/
	ViewModel.prototype.step = function(){
		this.model.step();
		console.log("ViewModel - STEP!");
	};
	
	/********************************
	 *     PRIVATE FUNCTIONS        *
	 ********************************/
	
	ViewModel.prototype.moveCamera = function(vector){
    this.cameraPosition[0] += vector[0];
    this.cameraPosition[1] += vector[1];
	};
	
	
	/**
	 * End class
	 */
	return ViewModel;
});
