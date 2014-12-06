Piece = function(){
	
	this.view = null;
	this.image = "";
	this.position = null;
	this.pieceType = "blank";
	this.onBoard = false;
	this.print = function(){
		console.info("printing piece " + this.pieceType);
	};
	this.build = function(print_fn, position, scenery){
		if(this.onBoard) return;
		this.position = position;
		this.view = print_fn(this, position);
		if(scenery != undefined){
			scenery.addPiece(this);
		}
	};
	this.remove = function(scenery){
		scenery.removePiece(this);
	};
	this.move = function(move_fn, position, callback){
		this.position = position;
		move_fn(this, position, callback);
	};

};

Coin = function(){
	this.pieceType = "coin";
	this.image = "images/coin.jpg";
};
Coin.prototype = new Piece();
Coin.prototype.constructor = Coin;

Sword = function(){
	this.pieceType = "sword";
	this.image = "images/sword.gif";
};
Sword.prototype = new Piece();
Sword.prototype.constructor = Sword;

Skull = function(){
	this.pieceType = "skull";
	this.image = "images/goblin.jpg";
};
Skull.prototype = new Piece();
Skull.prototype.constructor = Skull;

module.exports = {
	coin: Coin,
	sword: Sword,
	skull: Skull
};
