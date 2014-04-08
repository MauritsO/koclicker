//Used variables
var str;
var def;
var spd;
var agl;
var loc;

$(document).ready(function(){
	//TODO: If cookie does not exists
	newGame();
});

function newGame() {
	initVariables();
	playGame();

}

function initVariables() {
	str = 0;
	def = 0;
	spd = 0;
	agl = 0;
	loc = "gym"
}

function playGame() {
	setListeners();
}

function setListeners() {
	// Gym-specific listeners
	$("#str").click(function () {
	    str++;
	    $("#strmeter").text(str);
	});
	
	$("#def").click(function () {
	    def++;
	    $("#defmeter").text(def);
	});
	
	$("#spd").click(function () {
	    spd++;
	    $("#spdmeter").text(spd);
	});
	
	$("#agl").click(function () {
	    agl++;
	    $("#aglmeter").text(agl);
	});
	
	// Shop-specific listeners
	$("#weaponsO").click(function () {
	    $("#glove").slideUp();
	    $("#weapons").slideToggle();
	});
	
	$("#gloveO").click(function () {
	    $("#weapons").slideUp();
	    $("#glove").slideToggle();
	});
}
	

