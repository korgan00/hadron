requirejs.config({
    baseUrl: '../object-editor',
  //  urlArgs: 'bust=' + Date.now(),
    paths: {
        jquery: '../js/jquery-2.0.0.min',
        'object-editor': '../object-editor/src',
        'object-editor-engine': '../object-editor/src/editor-engine'
      }
  });

var enviromentFuncs;
var X = 0, Y = 1;

define(function (require) {
  "use strict";
	var EnviromentManager = require('object-editor/EnviromentManager'),
      env = new EnviromentManager();
	//console.log = function() {};
	
	/* ADD ALL DRAGABLE PANELS HERE*/
	env.addDragablePanel("objectEditorTitleBar", 
	                     "objectEditorWrapper");
  /* END DRAGABLE PANELS*/
	
	
	env.initialize();
	enviromentFuncs = env;
});
