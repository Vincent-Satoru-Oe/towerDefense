
var Player = function(data) {
	this.health = 1;
	this.coins = 50;
}

Player.prototype.doDamage = function(amount) {
	this.health = this.health - amount;
	if (this.health <= 0) {
		Game.loseGame();
	}
}