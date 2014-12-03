Message = function(){
	this.view = Ti.UI.createView({
		width: '100%',
		height: '100%',
		backgroundColor: '#FFF',
		opacity: '0.7',
		zIndex: 30
	});
	this.label = null;
	this.get = function(){
		this.view.add(this.label);
		return this.view;
	};
};

MessageWin = function(){
	this.label = Ti.UI.createLabel({
		textAlign: 'center',
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		text: 'YOU WON!'
	});
};
MessageWin.prototype = new Message();
MessageWin.prototype.constructor = MessageWin;

MessageLose = function(){
	this.label = Ti.UI.createLabel({
		textAlign: 'center',
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		text: 'YOU LOSE!'
	});
};
MessageLose.prototype = new Message();
MessageLose.prototype.constructor = MessageLose;

module.exports = {
	message: Message,
	win: MessageWin,
	lose: MessageLose
};
