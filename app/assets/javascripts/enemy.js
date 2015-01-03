
var Enemy = function(coordinate) {

	this.speed = 10;
	this.health = 10;
	this.power = 1;
	this.position = {
		top : pxTopCoordinate(parseRow(coordinate)),
		left : pxLeftCoordinate(parseColumn(coordinate))
	}
	var enemy = $(document.createElement("div"));
	enemy.css("background-image", "url(python.png)");
	enemy.css("position", "absolute");
	enemy.css("height", gridspaceHeight);
	enemy.css("width", gridspaceWidth);
	enemy.css("top", this.position.top);
	enemy.css("left", this.position.left);

	this.element = enemy;

	$('.viewport').append(enemy);
}

Enemy.prototype.move = function(x, y) {
	var newTop = parseFloat(this.element.css("top")) + y;
	this.element.css("top", pixilize(newTop));
	var newLeft = parseFloat(this.element.css("left")) + x;
	this.element.css("left", pixilize(newLeft));
}

Enemy.prototype.setTarget = function(newTarget) {
	
}