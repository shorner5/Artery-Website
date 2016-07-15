var names = ["Adrian, 29",  "Olivia, 20", "Stuart, 20","Jamal, 28","Oliver, 24" , "Jaime, 30", "Pedro, 19", "Joseph, 31", "Ava, 26", "Fred, 21"];
var images = ["img/j.jpg", "img/i.png", "img/h.jpg", "img/g.jpg", "img/f.png", "img/e.jpg", "img/d.jpg", "img/c.jpg", "img/b.jpg", "img/a.jpg"];
var position;
var pos_set = false;

var main = function() {
	populateCards();
}

function setDraggable(elem) {
	elem.draggable({ 
		scroll: false,
    	start: function(event, ui) {
        	ui.position.left = 0;
        	ui.position.top = 0;
    	},
  		stop: function(event, ui) {
  			onSwipe(elem.position().left - position.left, elem.position().top - position.top, elem);
  		},
  		drag: function(event, ui) {
  			if (pos_set == false) {
  				position = elem.position();
  				console.log(position);
  				pos_set = true;
  			}
  			else {
	  			distance = -(position.left - ui.position.left)/10;
				if (distance < 30 && distance > -20) {
					elem.animate({rotate: distance+'deg'}, 0);
				}
			}
  		}
	});
}

function populateCards() {
	for (i = 0; i < names.length; i++) {
		var elem = $("#card").clone();
		elem.insertBefore($("#card"));
		decorateElem(elem, i);
	}
}

function decorateElem(elem, i) {
	elem.zIndex(i + 1);
	var name = document.querySelector("#card").querySelector("#card-info");
	var img_src = document.querySelector("#card");
	$(name).html(names[i]);
	img_src.style.backgroundImage="url(" + images[i] + ")";
	setDraggable(elem);
}

function onSwipe(distance, distTop, elem) {
	if (distance > 200) {
				 elem.animate({
                left: '150%',
            }, 400, function() {
            	elem.hide();
            } );
		elem.draggable( "destroy" );
	}
	else if (distance < -300) {
		 elem.animate({
                left: '-150%',
            }, 400 );
		 elem.draggable( "destroy" );
	}
	else {
		console.log(distance / 4 + ", " + distTop /4);
		if (Math.abs(distance / 4) > 10 || Math.abs(distTop / 4) > 10) {
			elem.animate({left: position.left - (distance / 4),
								top: position.top - (distTop / 4),
								rotate: '0deg'}, 
								200, function() {
			    elem.animate({left: position.left,
								top: position.top}, 
								100);
			});
		}
		else {
			 elem.animate({left: position.left,
								top: position.top,
								rotate: '0deg'}, 
								200);
		}
	}
}

$(document).ready(main);

function resize() {
	pos_set = false;
}