var message = ["3", "2", "1", "VS"]
var curEnemy;
var self;
var opp;

function startBattle(id) {
	curEnemy = enemies[id];
	$( "#battle_btn" ).hide();
	animations();
}

function animations() {
	var menu = $( "#menu" );
	var battle = $( "#battle" );
	
	//battle.css("display", "table")
	menu.fadeOut('slow', function() {
			battle.fadeIn('fast', function() {
			showMessage();
			showImages();
			setTimeout(
			function() 
			  {
			    moveImages();
			  }, 5000);
		});
	});
}

function showMessage() {
	var msg_field = $( "#battle_msg" );
	i = 0;
	setInterval(function() {
		if (i < message.length) {
		    msg_field.fadeOut(500, function() {
				msg_field.html(message[i]);
				i++;
		        msg_field.fadeIn(500);
		    });
		} else return;
	}, 1000)
}

function showImages() {
	self = $( "#my_image" );
	opp = $( "#opp_image" );
	
	opp.attr("src", curEnemy.img);
	self.attr("src", "Henk.png");
	
	opp.fadeIn(4000);
	self.fadeIn(4000);
}

function moveImages() {
	console.log(self);
	//Test
	self.animate({ width: "40%" }, 1000 );
}