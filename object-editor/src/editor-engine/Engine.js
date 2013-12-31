
define(function(require) {
	// INCLUDES
	var EventManager = require('object-editor-engine/EventManager');
	var Render = require('object-editor-engine/Render');
	var ViewModel = require('object-editor-engine/ViewModel');
	
	/**
	 * Constructor
	 */
	function Engine() {
		this.TIME_INTERVAL = 100; //ms
		this._on = false;
		this._canvas = null;
		
		this._evManager = new EventManager();
		this._render = new Render();
		this._viewModel = new ViewModel();
	}
	
	/********************************
	 * 		PUBLIC FUNCTIONS 		*
	 ********************************/
	Engine.prototype.initialize = function (canvas){
	  this._canvas = canvas;
		this._configureEvents();
		
		this._render.setCanvas(this._canvas);
		
		
		setInterval(this._step.bind(this), this.TIME_INTERVAL);
	};
	
	Engine.prototype.stop = function (){
		this._on = false;
	};
	
	Engine.prototype.start = function (){
		this._on = true;
	};

	Engine.prototype.renderize = function (){
		if (!this._on) this._step();
	};
	
	/********************************
	 * 		PRIVATE FUNCTIONS 		*
	 ********************************/
	Engine.prototype._configureEvents = function (){
		
	};

	Engine.prototype._step = function(){
		if (this._on) {
			this._evManager.step();
			this._viewModel.step();
			this._render.step();
		}
	};
	
	
	
	/**
	 * End class
	 */
	return Engine;
});
