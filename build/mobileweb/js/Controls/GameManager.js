var gameManager = function(scn){

	if(scn.objType != "Scenery"){
		console.info("gameManager should receive a Scenery!");
	}	
	var scenery = scn;

	var gridSize = scenery.getSize();
	var qtdPieces = gridSize * gridSize;
	var pieces;
	var PiecePrinter;
	var Messages;
	
	var map;
	var winner;
	
	function initialize(){
		pieces = require("js/Models/Pieces.js");
		PiecePrinter = require("js/Views/Piece.js");
		PiecePrinter.setup(scenery);
		Messages = require("js/Views/Messages.js");
	};
	
	var startNullMap = function(){
		map = new Array(gridSize);
		for(var i=0; i<gridSize; i ++){
			map[i] = new Array(gridSize);
			for(var j=0; j<gridSize; j++){
				map[i][j] = null;
			}
		}
		winner = new Array(gridSize);
	};
	var ThrowCoins = function(qtdCoins){
		for(var x=1; x<=qtdCoins; x++){
			var randI = randomize(0, (gridSize-1));
			var randJ = randomize(0, (gridSize-1));
			if(map[randI][randJ] != null){
				x--;
			} else {
				map[randI][randJ] = new pieces.coin();
			}
		}		
	};
	var PrintPieces = function(interval){
		var time = 1;
		if(interval == undefined){
			interval = 0;
		} else {
			interval = 30;
		}
		WithEachPiece(function(i, j, piece){
			if(piece == null) return;
			(function insert(i, j, piece, time){
				setTimeout(function(){
					piece.build(PiecePrinter.print, {i: i, j: j}, scenery);
				}, time);
			})(i, j, piece, time);
			time = time + interval;
		});
	};
	var StartMap = function(){
		var qtdCoins = Math.ceil(qtdPieces/10);
//		qtdCoins = 0;
		var qtdMonsters = Math.ceil((qtdPieces - qtdCoins)/2);
		var qtdSwords = qtdPieces - qtdCoins - qtdMonsters;
		
		startNullMap();
		
		//throw coins:
		ThrowCoins(qtdCoins);
		var monstersLeft = qtdMonsters;
		var swordsLeft = qtdSwords;
		// give each rest randomly:
		WithEachPiece(function(i, j, piece){
			if(monstersLeft == 0){
				map[i][j] = new pieces.sword();
				return;
			}
			if(swordsLeft == 0){
				map[i][j] = new pieces.skull();
				return;
			}
			if(map[i][j] == null){
				if(FiftyFifty()){
					map[i][j] = new pieces.skull();
					monstersLeft --;
				} else {
					map[i][j] = new pieces.sword();
					swordsLeft --;
				}
			}
		});
	};
	var Win = function(){
		var message = new Messages.win();
		message.addAction(function(){
			RestartGame();
		});
		scenery.showMessage(message);
	};
	var Lose = function(){
		var message = new Messages.lose();
		message.addAction(function(){
			RestartGame();
		});
		scenery.showMessage(message);
	};
	var CheckWin = function(){
		var qtdMonsters = 0;
		var qtdSwords = 0;
		for(var i=0; i<gridSize; i++){
			if(winner[i].pieceType == "sword")
				qtdSwords ++;
			else
				qtdMonsters ++;
		}
		if(qtdSwords == gridSize){
			Win();
			return true;
		} else if (qtdMonsters == gridSize){
			Lose();
			return true;
		} else return false;
	};
	var NextTurn = function(){
		PrintPieces(0);
		if(CheckWin()){
			return;
		}
		var qtdCoins = Math.ceil(qtdPieces/20);
		ThrowCoins(qtdCoins);
		WithEachPiece(function(i, j, piece){
			if(piece == null){
				if(FiftyFifty()){
					map[i][j] = new pieces.skull();
				} else {
					map[i][j] = new pieces.sword();
				}
			}
		});
		PrintPieces(30);
	};

	var StartGame = function(){
		StartMap();
		PrintPieces(30);
	};
	var RestartGame = function(){
		removeAllPieces();
		startNullMap();
		StartGame();		
	};
	var removeAllPieces = function(){
		WithEachPiece(function(i, j, piece){
			if(piece!=null)
				piece.remove(scenery);
			map[i][j] = null;
		});
	};
	
	var StartControls = function(){
		scenery.addEvent("swipe", function(e){
			switch(e.direction){
				case "down":
					moveDown();
				break;
				case "up":
					moveUp();
				break;
				case "left":
					moveLeft();
				break;
				case "right":
					moveRight();
				break;
			}
		});
		window.document.addEventListener("keydown", function(e){
			switch(e.keyCode){
				case 40:
					moveDown();
				break;
				case 38:
					moveUp();
				break;
				case 37:
					moveLeft();
				break;
				case 39:
					moveRight();
				break;
			}
		});
	};
	
	var moveUp = function(){
		var callback = null;
		for(var j=0; j<gridSize; j++){
			var qtdMonsters = 0;
			var qtdSwords = 0;
			for(var i=(gridSize-1); i>=0; i--){
				var piece = map[i][j];
				if(piece == null) continue;
				switch(piece.pieceType){
					case "skull":
						qtdMonsters ++;
					break;
					case "sword":
						qtdSwords ++;
					break;
				}
				// last piece:
				if( (i == 0) && (j == gridSize-1) ){
					callback = function(){
						removeAllPieces();
						for(var j=0; j<gridSize; j++){
							var i = 0;
							map[i][j] = winner[j];
						}
						NextTurn();
					};
				}
				piece.move(
					PiecePrinter.move, 
					{i: 0, j: j},
					callback
				);
			}
			if(qtdSwords > qtdMonsters){
				winner[j] = new pieces.sword();
			} else {
				winner[j] = new pieces.skull();
			}
		}
	};
	var moveDown = function(){
		var callback = null;
		for(var j=0; j<gridSize; j++){
			var qtdMonsters = 0;
			var qtdSwords = 0;
			for(var i=0; i<gridSize; i++){
				var piece = map[i][j];
				if(piece == null) continue;
				switch(piece.pieceType){
					case "skull":
						qtdMonsters ++;
					break;
					case "sword":
						qtdSwords ++;
					break;
				}
				if( i == j && (j == gridSize-1) ){
					callback = function(){
						removeAllPieces();
						for(var j=0; j<gridSize; j++){
							var i = (gridSize-1);
							map[i][j] = winner[j];
						}
						NextTurn();
					};
				}
				piece.move(
					PiecePrinter.move, 
					{i: (gridSize-1), j: j},
					callback
				);
			}
			if(qtdSwords > qtdMonsters){
				winner[j] = new pieces.sword();
			} else {
				winner[j] = new pieces.skull();
			}
		}
	};
	var moveLeft = function(){
		var callback = null;
		for(var i=0; i<gridSize; i++){
			var qtdMonsters = 0;
			var qtdSwords = 0;
			for(var j=(gridSize-1); j>=0; j--){
				var piece = map[i][j];
				if(piece == null) continue;
				switch(piece.pieceType){
					case "skull":
						qtdMonsters ++;
					break;
					case "sword":
						qtdSwords ++;
					break;
				}
				if( (i == (gridSize-1)) && (j == 0) ){
					callback = function(){
						removeAllPieces();
						for(var i=0; i<gridSize; i++){
							var j = 0;
							map[i][j] = winner[i];
						}
						NextTurn();
					};
				}
				piece.move(
					PiecePrinter.move, 
					{i: i, j: 0},
					callback
				);
			}
			if(qtdSwords > qtdMonsters){
				winner[i] = new pieces.sword();
			} else {
				winner[i] = new pieces.skull();
			}
		}
	};	
	var moveRight = function(){
		var callback = null;
		for(var i=0; i<gridSize; i++){
			var qtdMonsters = 0;
			var qtdSwords = 0;
			for(var j=0; j<gridSize; j++){
				var piece = map[i][j];
				if(piece == null) continue;
				switch(piece.pieceType){
					case "skull":
						qtdMonsters ++;
					break;
					case "sword":
						qtdSwords ++;
					break;
				}
				if( (i == (gridSize-1)) && (j == i) ){
					callback = function(){
						removeAllPieces();
						for(var i=0; i<gridSize; i++){
							var j = (gridSize-1);
							map[i][j] = winner[i];
						}
						NextTurn();
					};
				}
				piece.move(
					PiecePrinter.move, 
					{i: i, j: (gridSize-1)},
					callback
				);
			}
			if(qtdSwords > qtdMonsters){
				winner[i] = new pieces.sword();
			} else {
				winner[i] = new pieces.skull();
			}
		}
	};

	var WithEachPiece = function(callback){
		for(var i=0; i<gridSize; i ++){
			for(var j=0; j<gridSize; j ++){
				callback(i, j, map[i][j]);
			}
		}
	};
		
	function randomize(min, max){
		return Math.ceil(Math.random() * max) + min;
	}
	function FiftyFifty(){
		return (Math.random() < 0.5);
	}
	
	initialize();
	return {
		objType: "Game Manager",
		startControls: StartControls,
		startGame: StartGame
	};
	
};

module.exports = gameManager;
