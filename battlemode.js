var message = ["3", "2", "1", "VS"]
var curEnemy;
var playerImage;
var oppImage;

function initBattle(id) {
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
			    startBattle(curEnemy);
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
	playerImage = $( "#my_image" );
	oppImage = $( "#opp_image" );
	
	oppImage.attr("src", curEnemy.img);
	playerImage.attr("src", "Henk.png");
	
	oppImage.fadeIn(4000);
	playerImage.fadeIn(4000);
}

function moveImages() {
	console.log(self);
	//Test
	playerImage.animate({ width: "40%" }, 1000 );
}

function startBattle(curEnemy){
    var aRateP = aRate(spd);
    var aRateO = aRate(curEnemy.spd);
    aap = setTimeout(function(){hit(curEnemy,aRateP);},aRateP);
    aao = setTimeout(function(){getHit(curEnemy, aRateO);},aRateO);
	console.log("battling: " + curEnemy.name);
}

function hit(curEnemy, aRate){
    var dodge = false;
    var dmg = str - curEnemy.def;
    var aglDif = curEnemy.agl - agl;
    
    if(dmg <= 0) {
        dmg = 1;
    }

    if(aglDif > 0){
        dodge = calcDodge(aglDif);
	}
	
    if(!dodge){
		console.log("youhit");
        curEnemy.curHealth -= dmg;
        updateOppStats();
    }
    
    if(curEnemy.curHealth <= 0){
        victory();
    }
    else{
        aap = setTimeout(function(){hit(curEnemy, aRate);},aRate);
    }
}

function getHit(curEnemy, aRate){
	var dodge = false;
    var dmg = curEnemy.str - def;
    if(dmg <= 0){
        dmg = 1;
	}
    var aglDif = agl - curEnemy.agl;
    if(aglDif > 0){
        dodge = calcDodge(aglDif);
	}
    if(!dodge){
		console.log("yougothit");
        curHealth -= dmg;
		updateStats();
    }
    if(curHealth < 0){
        defeat();
    }
    else{
        aao = setTimeout(function(){getHit(curEnemy, aRate)},aRate);
    }
}
function aRate(speed){
    return (1000 * (1 - (speed/100000)));
}

function victory(){
	clearTimeout(aao);
	console.log("you won");
}

function defeat(){
	clearTimeout(aap);
	console.log("defeet");
}

function calcDodge(){
	return false;
}