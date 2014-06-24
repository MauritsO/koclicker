var message = ["3", "2", "1", "VS"]
var curEnemy;
var playerImage;
var oppImage;

var button
var menuDiv;
var battleDiv;

var battleWidth;
var menuWidth;
var oppWidth;
var playerWidth;

function initBattle(id) {
	initAttributes();
	switchBattleMode();
	showIntroAnimations();
	
	setTimeout(
	function() {
		initWeights();
	    startBattle(curEnemy);
	  }, 4000);
}

function switchBattleMode() {
	disableGainsPS();
	button.fadeOut(500);
	menuDiv.fadeOut('slow', function() {
		battleDiv.fadeIn('fast', function() {
			return;
		});
	});
}

function switchMenuMode(won) {
	$( "#opp_stats" ).fadeOut(1000);
	battleDiv.fadeOut('slow', function() {
		menuDiv.fadeIn('slow', function() {
			enableGainsPS();
			setOpponents();
			alertResult(won);
			updateStats();
		});
	});
	
}

function alertResult(won) {
	if (won) {
		money = +money + curEnemy.reward;
		alert("Congratulations! You've beaten: " + curEnemy.name + ", and won " + curEnemy.reward + " coins!");
	} else {
		alert("Too bad, you lost the fight... You need to train harder!");
	}
}

function initAttributes() {
	button = $( "#battle_btn" );
	menuDiv = $( "#menu" );
	battleDiv = $( "#battle" );
	playerImage = $( "#my_image" );
	oppImage = $( "#opp_image" );
}

function initWeights() {
	battleWidth = battleDiv.width();
	menuWidth = menuDiv.width();
	playerWidth = playerImage.width();
	oppWidth = oppImage.width();	
}

function showIntroAnimations() {
	showMessage();
	showImages();
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
        if (curEnemy.curHealth < 0 ) {
        	curEnemy.curHealth = 0;
        }
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
    var aglDif = agl - curEnemy.agl;
    
    if(dmg <= 0){
        dmg = 1;
	}
	
    
    if(aglDif > 0){
        dodge = calcDodge(aglDif);
	}
	
    if(!dodge){
    	animateOppAttack();
		console.log("yougothit");
        curHealth -= dmg;
        if (curHealth < 0) {
        	curHealth = 0;
        }
		updateStats();
    }
    if(curHealth <= 0){
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
	switchMenuMode(true);
}

function defeat(){
	clearTimeout(aap);
	console.log("defeet");
	switchMenuMode(false);
}

function calcDodge(){
	return false;
}

function animateOppAttack() {
	oppImage.animate({ left : battleWidth - playerWidth * 1.5}, 300, function() {
		oppImage.addClass('mirror')
	});
	oppImage.animate({ left : 0}, 600, function() {
		oppImage.removeClass('mirror');
	});
}

function animatePlayerAttack() {
	playerImage.animate({ right : battleWidth - oppWidth * 1.5}, 300, function() {
		playerImage.addClass('mirror')
	});
	playerImage.animate({ right : 0}, 300, function() {
		playerImage.removeClass('mirror');
	});
}

