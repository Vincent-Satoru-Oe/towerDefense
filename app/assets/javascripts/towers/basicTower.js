//= require tower.js

var BasicTower = function(coordinateString) {
	Tower.call(this, coordinateString);

	this.type = "basicTower";
	this.id = 0;
	this.power = 3;
	this.range = 2;
	this.firerate = 40;
	this.area = 0;
	this.imageSource = "/basicTower.png";
	this.rangeImageSource = "/towerRange.png";
	this.bulletData = {
		name : "basicBullet",
		id : 0,
		speed : 10,
		power : this.power,
		size : 10,
		bulletImage : "/basicTower.png"
	};
	this.maxTargets = 1;
	this.rangeRadius = (this.range * gridspaceHeight) + gridspaceHeight
	
	var imageElement = this.createTowerImage();
	this.imageElement = imageElement;
	var rangeImageElement = this.createRangeImage();
	this.rangeImageElement = rangeImageElement;
	var towerElement = this.createTowerElement(imageElement, rangeImageElement);
	this.element = towerElement;
	Game.towers.push(this);
}

BasicTower.prototype = Object.create(Tower.prototype);
BasicTower.prototype.constructor = BasicTower;
