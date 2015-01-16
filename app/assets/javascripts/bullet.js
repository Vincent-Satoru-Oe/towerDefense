//= require entity.js

var Bullet = function(top, left, data, target) {

	this.name = data.name;
	this.id = data.id;
	this.speed = data.speed;
	this.power = data.power;
	this.size = data.size;
	this.imageSource = data.bulletImage;
	this.destination = target;
	this.position = {
		top : top,
		left : left
	}
	this.center = {
		top : top + this.size/2,
		left : left + this.size/2
	}

	var bulletImage = this.createBulletImage();
	this.bulletImage = bulletImage;

	var bulletElement = this.createBulletElement();
	this.element = bulletElement;

	$('.grid').append(this.element);

}

Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.createBulletImage = function() {
	var bulletImage = $(document.createElement("img"));
	bulletImage.addClass("bullet-image");
	bulletImage.attr("src", this.imageSource);
	bulletImage.css("position", "relative");
	bulletImage.css("height", this.size);
	bulletImage.css("width", this.size);
	return bulletImage;
}

Bullet.prototype.createBulletElement = function() {
	var bulletElement = $(document.createElement("div"));
	bulletElement.addClass("bullet");
	bulletElement.append(this.bulletImage);
	bulletElement.css("position", "absolute");
	bulletElement.css("z-index", "3");
	bulletElement.css("height", this.size);
	bulletElement.css("width", this.size);
	bulletElement.css("top", this.position.top);
	bulletElement.css("left", this.position.left);

	return bulletElement;
}

Bullet.prototype.reachedDestination = function() {
	this.destination.takeDamage(this.power);
	this.destroy();
}

Bullet.prototype.destroy = function() {
	this.element.remove();
	Game.bulletsToRemove.push(this);
}