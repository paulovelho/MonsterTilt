function ApplicationWindow(){

	var window;
	
	function initialize(){
		window = new Ti.UI.createWindow({
			backgroundColor: '#000'
		});
		window.open();
	}
	
	var addView = function(v){
		window.add(v);
	};
	
	initialize();
	return {
		objType: "Application Window",
		addView: function(v){
			addView(v);
		}
	};
};

module.exports = new ApplicationWindow();
