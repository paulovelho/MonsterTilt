function AppControl(){var n,e,r,o=5;return this.start=function(){n=require("js/Views/ApplicationWindow");var a=require("js/Views/Scenery");e=new a(o),n.addView(e.getGrid());var i=require("js/Controls/GameManager");r=new i(e),r.startControls(),r.startGame()},this}module.exports=AppControl;