//= require enemy.js

var BasicEnemy = function(coordinateString) {

	Enemy.call(this, coordinateString);

	this.name = "basicEnemy";
	this.id = 0;
	this.speed = 0.5;
	this.maxHealth = 100;
	this.power = 1;
	this.imageSource = "/python.png";

	this.health = this.maxHealth;

	var imageElement = this.createEnemyImage();
	this.imageElement = imageElement;
	var enemyElement = this.createEnemyElement(imageElement);
	this.element = enemyElement;
	$('.grid').append(enemyElement);

	Game.enemies.push(this);
}

BasicEnemy.prototype = Object.create(Enemy.prototype);
BasicEnemy.prototype.constructor = BasicEnemy;