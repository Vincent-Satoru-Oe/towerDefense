
var Menu = Menu || {};

Menu.currentTargetId = null;

Menu.show = function(type) {
	Menu.element.css("display", "block");
	Menu.currentTargetId = event.currentTarget.id;
}

Menu.addTower = function(type) {

	switch(type) {
		case 'basic':
			var newTower = new Tower(Menu.currentTargetId);
	}
}

Menu.hide = function() {
	Menu.element.css("display", "none");
}
