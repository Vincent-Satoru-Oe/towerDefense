//= require entity.js

var Tower = function(coordinateString) {
	Entity.call(this, coordinateString);

	var towerImage = $(document.createElement("img"));
	towerImage.attr("src", "basicTower.png");

	var tower = $(document.createElement("div"));
	tower.append(towerImage);
	tower.css("position", "relative");
	tower.css("height", gridspaceHeight);
	tower.css("width", gridspaceWidth);
	// tower.css("top", this.position.top);
	// tower.css("left", this.position.left);

	this.element = tower;

	Grid.getGridspaceFromCoordinateString(coordinateString).element.append(tower);
	Grid.getGridspaceFromCoordinateString(coordinateString).tower = this;
	// $('.viewport').append(tower);
}

Tower.prototype = Object.create(Entity.prototype);
Tower.prototype.constructor = Tower;
