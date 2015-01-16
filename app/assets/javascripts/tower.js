//= require entity.js

var Tower = function(coordinateString) {
	Entity.call(this, coordinateString);

	// this.type = data.name;
	// this.id = data.id;
	// this.power = data.power;
	// this.range = data.range;
	// this.rangeRadius = 0;
	// this.firerate = data.firerate;
	// this.area = data.area;
	// this.imageSource = data.towerImage;
	// this.rangeImageSource = data.rangeImage;
	// this.bulletData = data.bulletData;
	// this.maxTargets = 1;

	this.fireCounter = 0;
	this.enemiesInRange = [];
	this.targets = [];

}

Tower.prototype = Object.create(Entity.prototype);
Tower.prototype.constructor = Tower;

Tower.prototype.createTowerImage = function() {
	var towerImage = $(document.createElement("img"));
	towerImage.addClass("tower-image");
	towerImage.attr("src", this.imageSource);
	towerImage.css("position", "absolute");
	return towerImage;
}

Tower.prototype.createRangeImage = function() {
	var rangeImage = $(document.createElement("img"));
	var rangeHeight = (2 * this.range * gridspaceHeight) + gridspaceHeight;
	var rangeWidth = (2 * this.range * gridspaceWidth) + gridspaceWidth;
	var rangeHeightOffset = (this.range * gridspaceHeight) * -1;
	var rangeWidthOffset = (this.range * gridspaceWidth) * -1;
	rangeImage.addClass("range-image");
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

	towerImage.mouseenter(function() {rangeImage.css("display", "block")});
	towerImage.mouseleave(function() {rangeImage.css("display", "none")});
	return towerElement;
}

Tower.prototype.addTargetInRange = function(target) {
	this.enemiesInRange.push(target);
	this.setTarget();
}

Tower.prototype.setTarget = function() {
	if (this.enemiesInRange.length > 0) {
		if (this.targets.length < this.maxTargets) {
			this.targets.push(this.enemiesInRange[0]);
		}
	}
}

Tower.prototype.removeTargetInRange = function(target) {
	var enemiesInRangeIndex = this.enemiesInRange.indexOf(target);
	var targetsIndex = this.targets.indexOf(target);
	if (enemiesInRangeIndex > -1) {
		var newArr = this.enemiesInRange.slice(0, enemiesInRangeIndex).concat(this.enemiesInRange.slice(enemiesInRangeIndex + 1, this.enemiesInRange.length));
		this.enemiesInRange = newArr;
	}
	if (targetsIndex > -1) {
		var newArr = this.targets.slice(0, targetsIndex).concat(this.targets.slice(targetsIndex + 1, this.targets.length));
		this.targets = newArr;
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
		this.shootTarget(target);
	}
}

Tower.prototype.shootTarget = function(target) {
	var top = this.center.top - this.bulletData.size/2;
	var left = this.center.left - this.bulletData.size/2;
	var newBullet = new Bullet(top, left, this.bulletData, target);
	Game.bullets.push(newBullet);
}


