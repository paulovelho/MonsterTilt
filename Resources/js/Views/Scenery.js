Scenery = function(size){
	
	var gridSize = size;

	var view;
	var screenWidth = Titanium.Platform.DisplayCaps.platformWidth;
	var screenHeight = Titanium.Platform.DisplayCaps.platformHeight;
	var scenerySize;
	var tileSize;
	
	var piecesView;
	var messageView;
	
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
//		console.info(pieceView);
		piecesView.add(pieceView);
		// no animation was set...
		/*
		pieceView.setTransform(Titanium.UI.create2DMatrix().scale(0.1) );
		pieceView.animate({
			transform: Titanium.UI.create2DMatrix().scale(1.3),
			duration: 200,
			curve: Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
		}, function(){
			pieceView.animate({
				transform: Titanium.UI.create2DMatrix().scale(1),
				duration: 100,
				curve: Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
			});
		});
		*/
	};
	var RemovePiece = function(pieceView){
//		piecesView.remove(pieceView);
		// no animation as well...
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
	var ShowMessage = function(){
		view.add(messageView);
	};
	var RemoveMessage = function(){
		view.remove(messageView);
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
			if(!piece.onBoard)
				AddPiece(piece.view);
			piece.onBoard = true;
		},
		removePiece: function(piece){
			RemovePiece(piece.view);
			piece.onBoard = false;
		},
		showMessage: function(message){
			message.addAction(this.removeMessage);
			messageView = message.get(); 
			ShowMessage();
		},
		removeMessage: function(){
			RemoveMessage();
		}
	};
	
};

module.exports = Scenery;