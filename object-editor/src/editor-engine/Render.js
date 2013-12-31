
define(function(require) {
	// INCLUDES
	var ViewModel = require('object-editor-engine/ViewModel');
	
	/**
	 * Constructor
	 */
	function Render() {
	  this._canvas = null;
		this._ctx = null;
		
		this.ROTATE_CONST = -45*Math.PI/180;
		this.SCALE_CONST = [1, 0.5]
	}
	
	/********************************
	 * 		PUBLIC FUNCTIONS 		*
	 ********************************/
	Render.prototype.setCanvas = function(canvas){
	  this._canvas = canvas;
	  this._ctx = canvas.getContext('2d');
	};
	
	Render.prototype.step = function(){
	  this._clear();

	  this._ctx.save();

    this._ctx.translate(-this._canvas.width, this._canvas.height / 2);
    
	  this._ctx.scale(this.SCALE_CONST[0], this.SCALE_CONST[1]);
	  this._ctx.rotate(this.ROTATE_CONST);
	  
	  this._drawGrid();
		console.log("Render  - STEP!");
	  this._ctx.restore();
	};
	/********************************
	 * 		PRIVATE FUNCTIONS 		*
	 ********************************/

	Render.prototype._clear = function(){
	  this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
	};
	Render.prototype._drawGrid = function(){
	  var DIVS_SIZE = 100,//px 
    CANVAS_SIZE = Math.max(this._canvas.width, this._canvas.height) * 4,
    MAX_DIVS = Math.floor(CANVAS_SIZE/DIVS_SIZE)+1;
  
    this._ctx.beginPath();
    this._ctx.strokeStyle = '#444444';
    for(var i = 1; i < MAX_DIVS; i++){
      this._ctx.moveTo(i*DIVS_SIZE, 0);
      this._ctx.lineTo(i*DIVS_SIZE, CANVAS_SIZE);
    }
    for(var j = 1; j < MAX_DIVS; j++){
      this._ctx.moveTo(0, j*DIVS_SIZE);
      this._ctx.lineTo(CANVAS_SIZE, j*DIVS_SIZE);
    }
    this._ctx.stroke();
    this._ctx.closePath();
  };
	
	
	
	/**
	 * End class
	 */
	return Render;
});
