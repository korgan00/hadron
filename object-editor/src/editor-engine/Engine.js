define(function (require) {
  "use strict";
  // INCLUDES
  var EventManager = require('object-editor-engine/EventManager'),
      Render = require('object-editor-engine/Render'),
      ViewModel = require('object-editor-engine/ViewModel');
  
  /**
   * Constructor
   * @classDescription lalala
   */
  function Engine() {
    this.TIME_INTERVAL = 16; // ms
    this._on = false;
    this._canvas = null;
    
    this._evManager = new EventManager();
    this._viewModel = new ViewModel();
    this._render = new Render(this._viewModel);
  }
  
  /********************
   * PUBLIC FUNCTIONS *
   ********************/
  /**
   * Initialize the engine
   * @param canvas
   */
  Engine.prototype.initialize = function (canvas) {
    this._canvas = canvas;
    this._render.setCanvas(this._canvas);
    this._evManager.setCanvas(this._canvas);
    
    this._configureEvents();
    
    setInterval(this._step.bind(this), this.TIME_INTERVAL);
  };
  
  Engine.prototype.stop = function () {
    this._on = false;
  };
  
  Engine.prototype.start = function () {
    this._on = true;
  };
  
  Engine.prototype.renderize = function () {
    if (!this._on) { 
      this._step(); 
    }
  };
  
  /*********************
   * PRIVATE FUNCTIONS *
   *********************/
  Engine.prototype._configureEvents = function () {
    this._evManager.setViewModel(this._viewModel);
  };
  
  Engine.prototype._step = function () {
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
