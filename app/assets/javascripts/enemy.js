//= require entity.js

var Enemy = function(coordinateString) {

	Entity.call(this, coordinateString);

	this.speed = 5;
	this.health = 10;
	this.power = 1;

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

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;