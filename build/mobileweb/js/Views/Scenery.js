Scenery = function(size){
	
	var gridSize = size;

	var view;
	var screenWidth = Titanium.Platform.DisplayCaps.platformWidth;
	var screenHeight = Titanium.Platform.DisplayCaps.platformHeight;
	var scenerySize;
	var tileSize;
	
	var piecesView;
	
	var borderSize = 3;
	var marginLeft;

	var borderColor = {
		color: '#222',
		transparency: 1 
	};
	var tileColor = {
		color: '#eee',
		transparency: 0.5
	};

	var createTile = function(posi, posj){
		var tile = Ti.UI.createView({
			height: tileSize,
			width: tileSize,
			top: borderSize + (posi * (borderSize*2)) + (posi * tileSize),
			left: borderSize + (posj * (borderSize*2)) + (posj * tileSize),
			borderRadius: 3,
			backgroundColor: tileColor.color,
			textAlign: 'center',
			font: {
				fontWeight: 'bold',
				fontSize: 55
			},
			zIndex: 10,
			opacity: tileColor.transparency
		});
		return tile;
	};
	
	var buildBorders = function(){
		for(var i=1; i< (gridSize); i++){
			var vBorder = Ti.UI.createView({
				height: borderSize,
				width: scenerySize,
				top: ((i * borderSize * 2) + (i * tileSize)) - (borderSize),
				left: 0,
				backgroundColor: borderColor.color,
				zIndex:20
			});
			var hBorder = Ti.UI.createView({
				height: scenerySize,
				width: (borderSize*2),
				left: ((i * borderSize * 2) + (i * tileSize)) - (borderSize),
				top: 0,
				backgroundColor: borderColor.color,
				zIndex:20
			});
			view.add(vBorder);
			view.add(hBorder);
		}
	};
	
	var createScenery = function(){
		if(screenWidth > screenHeight){
			scenerySize = screenHeight;
			marginLeft = (screenWidth/2)-(scenerySize/2);
		} else {
			scenerySize = screenWidth;
			marginLeft = 0;
		}
		tileSize = (scenerySize / gridSize) - (borderSize*2);
		
		view = Ti.UI.createView({
			height: scenerySize,
			width: scenerySize,
			top: 0,
			left: marginLeft,
			backgroundColor: borderColor.color,
			zIndex: 5
		});
		piecesView = Ti.UI.createView({
			height: scenerySize,
			width: scenerySize,
			top: 0,
			left:0,
			opacity: 1,
			zIndex:15
		});
		
	};
	
	var AddPiece = function(pieceView){
		
		piecesView.add(pieceView);

/*		
		var originalW = pieceView.getWidth();
		var originalH = pieceView.getHeight();
		pieceView.setWidth(0);
		pieceView.setHeight(0);
		piecesView.add(pieceView);
		
		var animationSetup = {duration: 700, height: originalH, width: originalW};
		console.info(animationSetup);
		var popFrom = Ti.UI.createAnimation(animationSetup);
		pieceView.animate(popFrom);
*/
		
	};
	var RemovePiece = function(pieceView){
		var viewSize = pieceView.getHeight();
		var viewTop = pieceView.getTop();
		var viewLeft = pieceView.getLeft();
		var remove = Ti.UI.createAnimation({
			width: 0,
			height: 0,
			top: viewTop + (viewSize/2),
			left: viewLeft + (viewSize/2),
			duration: 500
		});
		pieceView.animate(remove, function(){
			piecesView.remove(pieceView);
		});
	};
	
	var getGridScenery = function(){
		buildBorders();
		for( var i = 0; i < gridSize; i++ ){
			for( var j = 0; j < gridSize; j++ ){
				var tile = createTile(i, j);
				view.add(tile);
			}
		}
		view.add(piecesView);
		return view;
	};
	var ShowMessage = function(messageView){
		view.add(messageView);
	};
	
	return {
		objType: "Scenery",
		addEvent: function(event, callback){
			view.addEventListener(event, callback);
		},
		getGrid: function(){
			createScenery();
			return getGridScenery();
		},
		getSize: function(){
			return gridSize;
		},
		getBorderMargin: function(){
			return borderSize;
		},
		getTileSize: function(){
			return tileSize;
		},
		getScenerySize: function(){
			return scenerySize;
		},
		addPiece: function(piece){
			AddPiece(piece.view);
		},
		removePiece: function(piece){
			RemovePiece(piece.view);
		},
		showMessage: function(message){
			ShowMessage(message.get());
		}
	};
	
};

module.exports = Scenery;