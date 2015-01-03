//= require entity.js

var Enemy = function(coordinateString) {

	Entity.call(this, coordinateString);

	this.speed = 1;
	this.health = 10;
	this.power = 1;

	var enemyImage = $(document.createElement("img"));
	enemyImage.attr("src", "python.png");

	var enemy = $(document.createElement("div"));
	enemy.addClass("enemy");
	enemy.append(enemyImage);
	enemy.css("position", "absolute");
	enemy.css("height", gridspaceHeight);
	enemy.css("width", gridspaceWidth);
	enemy.css("top", this.position.top);
	enemy.css("left", this.position.left);

	this.element = enemy;

	$('.grid').append(enemy);
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

