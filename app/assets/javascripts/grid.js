
var Grid = {
	element : null,
	grid : [],
	waypoints : []
}

Grid.getGridspaceFromCoordinateString = function(coordinateString) {
	return Grid.grid[parseRow(coordinateString)][parseColumn(coordinateString)];
}

Grid.getGridspaceFromRowColumn = function(row, column) {
	return Grid.grid[row][column];
}

//------------------------------ GRIDSPACE --------------------------------------

var Gridspace = function(coordinateString) {
	Gridspace(parseRow(coordinateString), parseColumn(coordinateString));
}

var Gridspace = function(row, col) {
	this.coordinateString = stringify(row, col);
	this.element = $("#" + this.coordinateString);
	this.row = row;
	this.column = col;
	this.position = {
		top : pxTopCoordinate(this.row),
		left : pxLeftCoordinate(this.column)
	}
	this.center = {
		top : this.top + gridspaceHeight/2,
		left : this.left + gridspaceWidth/2
	}
	this.isWaypoint = false;
	this.tower = null
}

Gridspace.prototype.setWaypoint = function() {
	this.isWaypoint = true;
	this.element.css("border-color", "red");
	this.element.attr("onclick", null);
}

Gridspace.prototype.createTower = function(type) {
	var newTower = Game.createTower(this.coordinateString, type);
	this.element.append(newTower.element);
	this.tower = newTower;
}

//---------------------------------------grid parsing helpers--------------------------

function stringify(row, column) {
	return row.toString() + "_" + column.toString();
}

function parseRow(coordinate) {
	return coordinate.split("_")[0];
}

function parseColumn(coordinate) {
	return coordinate.split("_")[1];
}

function pxTopCoordinate(row) {
	row = parseInt(row);
	if (row >= -1 && row <= rows) {
		return (row * gridspaceHeight) + gridspaceHeight;
	}
}

function pxLeftCoordinate(column) {
	column = parseInt(column);
	if (column >= -1 && column <= columns) {
		return (column * gridspaceWidth) + gridspaceWidth;
	}
}