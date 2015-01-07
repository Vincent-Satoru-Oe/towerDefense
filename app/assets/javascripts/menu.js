
var Menu = Menu || {};

Menu.currentTargetId = null;

Menu.show = function(type) {
	Menu.element.css("display", "block");
	Menu.currentTargetId = event.currentTarget.id;
}

Menu.createTower = function(type) {
	Grid.getGridspaceFromCoordinateString(Menu.currentTargetId).createTower(type);
	this.hide();
}

Menu.hide = function() {
	Menu.element.css("display", "none");
}

Menu.construct = function() {
	
}