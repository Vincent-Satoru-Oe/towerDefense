
var Enemy = function(coordinate) {

	this.speed = 5;
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
	var newTop = parseInt(this.element.css("top")) + x;
	this.element.css("top", pixilize(newTop));
	var newLeft = parseInt(this.element.css("left")) + y;
	this.element.css("left", pixilize(newLeft));
}

Enemy.prototype.setTarget(newTarget) {
	
}