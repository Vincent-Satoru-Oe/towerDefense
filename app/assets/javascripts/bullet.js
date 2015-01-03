//= require entity.js

var Bullet = function(coordinateString) {

	Entity.call(this, coordinateString);

	this.speed = 5;
}

Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Bullet;