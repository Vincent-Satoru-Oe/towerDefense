//= require entity.js

var Enemy = function(coordinateString) {

	Entity.call(this, coordinateString);

	this.speed = .5;
	this.maxHealth = 100;
	this.power = 1;

	this.health = this.maxHealth;

	var enemyImage = this.createEnemyImage();
	this.enemyImage = enemyImage;
	var enemyElement = this.createEnemyElement(enemyImage);
	this.element = enemyElement;
	$('.grid').append(enemyElement);

	// this.towersTargetedBy = [];
	this.towersInRange = [];
	this.towersToRemove = [];

	Game.enemies.push(this);
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.createEnemyImage = function() {
	var enemyImage = $(document.createElement("img"));
	enemyImage.attr("src", "python.png");
	return enemyImage;
}

Enemy.prototype.createEnemyElement = function(enemyImage) {
	var enemyElement = $(document.createElement("div"));
	enemyElement.addClass("enemy");
	enemyElement.append(enemyImage);
	enemyElement.css("position", "absolute");
	enemyElement.css("height", gridspaceHeight);
	enemyElement.css("width", gridspaceWidth);
	enemyElement.css("top", this.position.top);
	enemyElement.css("left", this.position.left);
	return enemyElement
}

Enemy.prototype.reachedDestination = function() {
	if (this.destination.next != null) {
		this.destination = this.destination.next;
	} else {
		Game.player.doDamage(this.power);
		this.destroy();
	}
}

Enemy.prototype.updateVisibility = function() {
	// check to see if there it has left the range of any tower
	var towerInRange;
	for (var i = 0; i < this.towersInRange.length; i++) {
		towerInRange = this.towersInRange[i];
		if (distance(this, towerInRange) > towerInRange.rangeRadius) {
			this.towersToRemove.push(towerInRange);
		}
	}
	var towerToRemove;
	var index;
	for (var i = 0; i < this.towersToRemove.length; i++) {
		towerToRemove = this.towersToRemove[i];
		index = this.towersInRange.indexOf(towerToRemove);
		towerToRemove.removeTargetInRange(this);
		this.towersInRange.splice(index, 1);
	}
	this.towersToRemove = [];

	// check to see if it entered a range of any tower
	var tower;
	for (var i = 0; i < Game.towers.length; i++) {
		tower = Game.towers[i];
		if (distance(this, tower) <= tower.rangeRadius) {
			if (this.towersInRange.indexOf(tower) == -1) {
				tower.addTargetInRange(this);
				this.towersInRange.push(tower);
			}
		}
	}

}

Enemy.prototype.takeDamage = function(amount) {
	this.health = this.health - amount;
	if (this.health <= 0) {
		this.destroy();
	}
}

Enemy.prototype.destroy = function() {
	this.element.remove();
	Game.enemiesToRemove.push(this);
	for (var i = 0; i < this.towersInRange.length; i++) {
		this.towersInRange[i].removeTargetInRange(this);
	}
	this.towersInRange = [];

}