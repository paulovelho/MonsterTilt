PiecePrinter = function(){
	
	var tileSize;
	var pieceSize;
	var pieceMargin = 0;
	var setup = {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#FFF',
		transparency: 1,
		zIndex: 12
	};
	var Init = function(scenery){
		tileSize = scenery.getTileSize() + (scenery.getBorderMargin()*2);
		pieceSize = tileSize - (tileSize/5);
		pieceMargin = ((tileSize-pieceSize) / 2);
		setup.width = pieceSize;
		setup.height = pieceSize;
		setup.borderRadius = pieceSize;
	};
	var Print = function(piece, position){
		var view;
		setup.top = pieceMargin + (tileSize*position.i);
		setup.left = pieceMargin + (tileSize*position.j);
		setup.backgroundImage = piece.image;
		view = Ti.UI.createView(setup);
		return view;
	};
	var Move = function(piece, position, callback){		
		var view = piece.view;
		if(view == null) return;
		var fTop = pieceMargin + (tileSize * position.i);
		var fLeft = pieceMargin + (tileSize  * position.j);
		var move = Ti.UI.createAnimation({
			top: fTop,
			left: fLeft,
			duration: 700
		});
		if(callback == undefined){
			view.animate(move);
		} else {
			view.animate(move, callback);
		}
	};
	
	return {
		setup: Init,
		print: function(piece, position){
			return Print(piece, position);
		},
		move: function(piece, position, callback){
			return Move(piece, position, callback);
		}
	};
};

module.exports = new PiecePrinter();
