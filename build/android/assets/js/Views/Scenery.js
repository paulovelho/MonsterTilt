Scenery=function(e){function n(e){return Titanium.Platform.displayCaps.dpi>160?e/(Titanium.Platform.displayCaps.dpi/160):e}var i,t,o,r,a,s,c,u=e,l=250,d=3,f={color:"#222",transparency:1},p={color:"#eee",transparency:.5},w=function(e,n){var i=Ti.UI.createView({height:r,width:r,top:d+2*e*d+e*r,left:d+2*n*d+n*r,borderRadius:3,backgroundColor:p.color,textAlign:"center",font:{fontWeight:"bold",fontSize:55},zIndex:10,opacity:p.transparency});return i},v=function(){for(var e=1;u>e;e++){var n=Ti.UI.createView({height:d,width:l,top:e*d*2+e*r-d,left:0,backgroundColor:f.color,zIndex:20}),t=Ti.UI.createView({height:l,width:2*d,left:e*d*2+e*r-d,top:0,backgroundColor:f.color,zIndex:20});i.add(n),i.add(t)}},g=function(){t=Ti.Platform.displayCaps.platformWidth,o=Ti.Platform.displayCaps.platformHeight,t=n(t),o=n(o),console.info("screen: "+t+"x"+o),t>o?(l=o,c=t/2-l/2):(l=t,c=0),console.info("building scenery - size: "+l),r=l/u-2*d,i=Ti.UI.createView({height:l,width:l,top:0,left:c,backgroundColor:f.color,zIndex:5}),a=Ti.UI.createView({height:l,width:l,top:0,left:0,opacity:1,zIndex:15})},h=function(e){a.add(e)},m=function(e){var n=e.getHeight(),i=e.getTop(),t=e.getLeft(),o=Ti.UI.createAnimation({width:0,height:0,top:i+n/2,left:t+n/2,duration:500});e.animate(o,function(){a.remove(e)})},T=function(){v();for(var e=0;u>e;e++)for(var n=0;u>n;n++){var t=w(e,n);i.add(t)}return i.add(a),i},y=function(){i.add(s)},b=function(){i.remove(s)};return{objType:"Scenery",addEvent:function(e,n){i.addEventListener(e,n)},getGrid:function(){return g(),T()},getSize:function(){return u},getBorderMargin:function(){return d},getTileSize:function(){return r},getScenerySize:function(){return l},addPiece:function(e){e.onBoard||h(e.view),e.onBoard=!0},removePiece:function(e){m(e.view),e.onBoard=!1},showMessage:function(e){e.addAction(this.removeMessage),s=e.get(),y()},removeMessage:function(){b()}}},module.exports=Scenery;