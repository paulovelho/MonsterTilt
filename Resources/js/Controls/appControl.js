function AppControl(){

	var objType = "AppControl";
	var view;
	var scenery;
	var gm;
	
	var gridSize = 5;

	this.start = function(){
		view = require("js/Views/ApplicationWindow");
		
		var Scenery = require("js/Views/Scenery");
		scenery = new Scenery(gridSize);
		view.addView(scenery.getGrid());
		
		var gameManager = require("js/Controls/GameManager");
		gm = new gameManager(scenery);
		gm.startControls();
		gm.startGame();
		
	};
	
	return this;
	
};

module.exports = AppControl;