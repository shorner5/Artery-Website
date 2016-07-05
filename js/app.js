var names = ["Adrian, 29",  "Olivia, 26", "Stuart, 20","Jamal, 28","Oliver, 24" , "Jaime, 30", "Pedro, 19", "Joseph, 31", "Johnny, 26", "Fred, 21"];
var images = ["img/j.jpg", "img/i.png", "img/h.jpg", "img/g.jpg", "img/f.png", "img/e.jpg", "img/d.jpg", "img/c.jpg", "img/b.jpg", "img/a.jpg"];

var main = function() {
	populateCards();
}

function setDraggable(elem) {
	position = elem.position();
	elem.draggable({
  		stop: function(event, ui) {
  			onSwipe(elem.position().left - position.left, elem);
  		},
  		drag: function(event, ui) {
  			distance = -(position.left - ui.position.left)/10;
  			elem.animate({rotate: distance+'deg'}, 1);
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
	var name = document.querySelector("#container").querySelector("#card").querySelector("#card-info");
	var img_src = document.querySelector("#container").querySelector("#card").querySelector("#card-image");
	$(name).html(names[i]);
	img_src.src = images[i];
	setDraggable(elem);
}

function onSwipe(distance, elem) {
	if (distance > 200) {
				 elem.animate({
                left: '150%',
            }, 400 );
		elem.draggable( "destroy" );
	}
	else if (distance < -300) {
		 elem.animate({
                left: '-150%',
            }, 400 );
		 elem.draggable( "destroy" );
	}
	else {
		elem.animate({left: position.left,
							top: position.top,
							rotate: '0deg'}, 
							300, function() {
		    // Animation complete.
		  });
	}
}

$(document).ready(main);