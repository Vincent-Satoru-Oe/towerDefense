
var Menu = Menu || {};

Menu.currentTargetId = null;

Menu.show = function(type) {
	Menu.element.css("display", "block");
	Menu.currentTargetId = event.currentTarget.id;
}

Menu.addTower = function(type) {

	var tower = $(document.createElement("img"));

	switch(type) {
		case 'basic':
		tower.attr("src", "basicTower.png");
	}


	$("#" + Menu.currentTargetId).append(tower);
}

Menu.hide = function() {
	Menu.element.css("display", "none");
}
