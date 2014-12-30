// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

viewHeight = 560;
viewWidth = 800;

rows = 14;
columns = 20;

gridSpaceWidth = 40;
gridSpaceHeight = 40;

waypoints = ["1-1", "3-2", "13-10", "9-3"]
wayPointArr = [];

function render() {
	$('.viewport').css('display', 'block');
	var html = "";
	for(var i=0; i<rows; i++) {
		html += "<div class='row'>";
		for(var j=0; j<columns; j++) {
	  		html += "<div class='game-space' id="+i+"-"+j+" onclick=showMenu(0)></div>";
		}
		html += "</div>";
	}
	$('.viewport').html(html);

	menu = $('.menu-modal');

  	//set up the waypoints at the given coordinates
  	for (i = 0; i < waypoints.length; i++) {
  		waypoint = new Waypoint(waypoints[i]);
  		wayPointArr.push(waypoint);
  	} 
}

function rowCoordinate(row) {
	if (row < rows) {
		return row * 40;
	}
}

function columnCoordinate(column) {
	if (column < columns) {
		return column * 40;
	}
}

function pixilize(value) {
	return value + "px";
}

function startGame() {
  render();
}

function showMenu(type) {
	menu.css("display", "block");
}

function hideMenu() {
	menu.css("display", "none");
}