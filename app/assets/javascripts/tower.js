//= require entity.js
//= require towers/basicTower.js

towerIndex = {
	0 : basicTower
}

var Tower = function(coordinateString, data) {
	Entity.call(this, coordinateString);

	this.type = data.name;
	this.id = data.id;
	this.power = data.power;
	this.range = data.range;
	this.rangeRadius = 0;
	this.firerate = data.firerate;
	this.area = data.area;
	this.towerImageSource = data.towerImage;
	this.rangeImageSource = data.rangeImage;

	this.fireCounter = 0;

	var towerImage = this.createTowerImage();
	this.towerImage = towerImage;

	var rangeImage = this.createRangeImage();
	this.rangeImage = rangeImage

	var towerElement = this.createTowerElement(towerImage, rangeImage);
	this.element = towerElement;

	this.enemiesInRange = [];
	this.targets = [];

	Game.towers.push(this);

}

Tower.prototype = Object.create(Entity.prototype);
Tower.prototype.constructor = Tower;

Tower.prototype.createTowerImage = function() {
	var towerImage = $(document.createElement("img"));
	towerImage.addClass("tower-image");
	towerImage.attr("src", this.towerImageSource);
	towerImage.css("position", "absolute");
	return towerImage;
}

Tower.prototype.createRangeImage = function() {
	var rangeImage = $(document.createElement("img"));
	var rangeHeight = (2 * this.range * gridspaceHeight) + gridspaceHeight;
	var rangeWidth = (2 * this.range * gridspaceWidth) + gridspaceWidth;
	this.rangeRadius = rangeHeight/2;
	var rangeHeightOffset = (this.range * gridspaceHeight) * -1;
	var rangeWidthOffset = (this.range * gridspaceWidth) * -1;
	rangeImage.addClass("tower-range");
	rangeImage.attr("src", this.rangeImageSource);
	rangeImage.css("position", "absolute");
	rangeImage.css("height", pixilize(rangeHeight));
	rangeImage.css("width", pixilize(rangeWidth));
	rangeImage.css("top", pixilize(rangeHeightOffset));
	rangeImage.css("left", pixilize(rangeWidthOffset));
	return rangeImage;
}

Tower.prototype.createTowerElement = function(towerImage, rangeImage) {
	var towerElement = $(document.createElement("div"));
	towerElement.addClass("tower");
	towerElement.append(towerImage);
	towerElement.append(rangeImage);
	towerElement.css("position", "relative");
	towerElement.css("height", gridspaceHeight);
	towerElement.css("width", gridspaceWidth);

	towerElement.mouseenter(function() {rangeImage.css("display", "block")});
	towerElement.mouseleave(function() {rangeImage.css("display", "none")});
	return towerElement;
}

Tower.prototype.addTargetInRange = function(target) {
	this.enemiesInRange.push(target);
	this.setTarget();
}

Tower.prototype.setTarget = function() {
	if (this.enemiesInRange.length > 0) {
		this.targets = [this.enemiesInRange[0]];
	}
}

Tower.prototype.removeTargetInRange = function(target) {
	var enemiesInRangeIndex = this.enemiesInRange.indexOf(target);
	var targetsIndex = this.targets.indexOf(target);
	if (enemiesInRangeIndex > -1) {
		this.enemiesInRange.splice(enemiesInRangeIndex, 1);
	}
	if (targetsIndex > -1) {
		this.targets.splice(targetsIndex, 1);
		this.setTarget();
	}
}

Tower.prototype.loadShot = function() {
	this.fireCounter += 1;
	if (this.fireCounter >= this.firerate) {
		if (this.targets.length > 0) {
			this.shootTargets();
			this.fireCounter = 0;
		}
	}
}

Tower.prototype.shootTargets = function() {
	var target;
	for (var i = 0; i < this.targets.length; i++) {
		target = this.targets[i];
		target.takeDamage(this.power);
	}
}
