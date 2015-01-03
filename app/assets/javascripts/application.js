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

function render() {
  $('.viewport').css('display', 'block');
  var html = "";
  for(var i=0; i<14; i++) {
    html += "<div class='row'>";
    for(var j=0; j<20; j++) {
      	html += "<div class='game-space' id="+i+"-"+j+"></div>";
    }
    html += "</div>";
  }
  $('.viewport').html(html);

  var newBullet = $(document.createElement("div"));
  newBullet.css("background-image", "url(python.png)");
  newBullet.css("position", "absolute");
  newBullet.css("height", "40px");
  newBullet.css("width", "40px");
  newBullet.css("top", "0px");
  newBullet.css("left", "0px")

  //$('.viewport').append(newBullet);
  createSquare();
}

function createSquare() {
  var aShape = $(document.createElement("div"));
  aShape.css("background-image", "url(Square.png)");
  aShape.css("position", "absolute");
  aShape.css("height", "90px");
  aShape.css("width", "90px");
  aShape.css("top", "15px");
  aShape.css("left", "15px")

  $('.viewport').append(aShape);
  alert("This worked");
}



function startGame() {
  render();
}