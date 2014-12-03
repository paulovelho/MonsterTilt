function AppControl(){

	var objType = "AppControl";
	var view;
	var scenery;
	var gm;
	
	var gridSize = 5;

	start = function(){
		view = require("js/Views/ApplicationWindow.js");
		
		var Scenery = require("js/Views/Scenery.js");
		scenery = new Scenery(gridSize);
		view.addView(scenery.getGrid());
		
		var gameManager = require("js/Controls/GameManager.js");
		gm = new gameManager(scenery);
		gm.startControls();
		gm.startGame();
		
	};
	
	return self;
	
};

module.exports = AppControl;