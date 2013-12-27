
define(function(require) {
	// INCLUDES
	var EventManager = require('object-editor-engine/EventManager');
	var Render = require('object-editor-engine/Render');
	var ViewModel = require('object-editor-engine/ViewModel');
	
	/**
	 * Constructor
	 */
	function Engine() {
		this.TIME_INTERVAL = 16; //ms
		this.on = false;
		
		this.evManager = new EventManager();
		this.render = new Render();
		this.viewModel = new ViewModel();
	}
	
	/********************************
	 * 		PUBLIC FUNCTIONS 		*
	 ********************************/
	Engine.prototype.initialize = function (){
		this._configureEvents();
		setInterval(this._step.bind(this), this.TIME_INTERVAL);
	};
	
	Engine.prototype.stop = function (){
		this.on = false;
	};
	
	Engine.prototype.start = function (){
		this.on = true;
	};

	Engine.prototype.renderize = function (){
		if (!this.on) this._step();
	};
	
	/********************************
	 * 		PRIVATE FUNCTIONS 		*
	 ********************************/
	Engine.prototype._configureEvents = function (){
		
	};

	Engine.prototype._step = function(){
		if (this.on) {
			this.evManager.step();
			this.viewModel.step();
			this.render.step();
		}
	};
	
	
	
	/**
	 * End class
	 */
	return Engine;
});
