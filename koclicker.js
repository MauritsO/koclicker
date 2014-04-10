//Used variables
var str;
var def;
var spd;
var agl;
var items;
var loc;
var usern;
var inv;

//shop-related
var gloves;
var shield;
var shoes;
var potion;
var shop;


$(document).ready(function(){
	inv = []
	if (isCookie()) {
		loadGame();
	} else {
		newGame();
	}
	var hoi = shop[1].name;
});

function newGame() {
	initVariables();
	playGame();
}

function loadGame() {
	loadVariables();
	playGame();
}

function initVariables() {
	str = 0;
	def = 0;
	spd = 0;
	agl = 0;
	shop = [];
	inv = [];
	usern = askUsername();
	loc = "gym"
}

function playGame() {
	setListeners();
	updateStats();
	setShop();
	
}

function askUsername() {
	user = prompt("Please enter your name:","");
	if (user!=="" && user!==null) {
		setCookie("username",user,365);
		usern = user;
	} else {
		askUsername();
	}
}

function setShop() {
	createItems();
	setItems();
}

function createItems() {
	shop = [];
	shop.push(new item("Gloves", 1,  150, 100, 20, 5));
	shop.push(new item("Shield", 1,  0, 300, 0, 0));
	shop.push(new item("Shoes", 1, 10, 0, 250, 250));
	shop.push(new item("Potion", 1, 10, 10, 10, 10));
}

function setItems() {
	shopDiv = $("#items");
	var shopCode = "";
	for (var i = 0; i < shop.length; i++) {
		shopCode += '<li id = "' + i + '"onclick="buyItem(this)">' + shop[i].name + '(level: ' + shop[i].lvl + ')</li>';
	}
	shopDiv.html(shopCode)
}

function buyItem(elem) {
	var id = elem.id;
	inv[id] = shop[id];
	console.log(inv);
	
	shop[id].lvl++;
	shop[id].str = Math.round(shop[id].str * 1.1);
	shop[id].def = Math.round(shop[id].def * 1.1);
	shop[id].spd = Math.round(shop[id].spd * 1.1);
	shop[id].agl = Math.round(shop[id].agl * 1.1);
	
	setItems();
	updateStats();
}

function updateStats() {
	var tot_str = +str;
	var tot_def = +def;
	var tot_spd = +spd;
	var tot_agl = +agl;
	
	for (var i = 0; i < inv.length; i++) {
		if (typeof inv[i] !== "undefined") {
			tot_str += inv[i].str;
			tot_def += inv[i].def;
			tot_spd += inv[i].spd;
			tot_agl += inv[i].agl;
		}
	}

 	$("#totalstr").text("Strength: " + Math.round(tot_str));
 	$("#totaldef").text("Defense: " + Math.round(tot_def));
 	$("#totalspd").text("Speed: " + Math.round(tot_spd));
 	$("#totalagl").text("Agility: " + Math.round(tot_agl));
}


function setListeners() {
	// Gym-specific listeners
	$("#str").click(function () {
	    str++;
	    $("#strmeter").text(str);
	    updateStats();
	});
	
	$("#def").click(function () {
	    def++;
	    $("#defmeter").text(def);
	    updateStats();
	});
	
	$("#spd").click(function () {
	    spd++;
	    $("#spdmeter").text(spd);
	    updateStats();
	});
	
	$("#agl").click(function () {
	    agl++;
	    $("#aglmeter").text(agl);
	    updateStats();
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
	
	// Non-specific listeners
	$("#save").click(function(){
	    setCookie("str",str,365);
	    setCookie("def",def,365);
	    setCookie("spd",spd,365);
	    setCookie("agl",agl,365);
	});
}

function isCookie() {
	var user=getCookie("username");
	if (user!=="") {
		usern = user;
		return true;
	} else {
		return false;
	}
}

function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)===0) return c.substring(name.length,c.length);
	}
	return "";
}

function loadVariables(){
    str = getCookie("str");
    def = getCookie("def");
    spd = getCookie("spd");
    agl = getCookie("agl");
    if(str ==="")
        str = 0;
    if(def ==="")
        def = 0;
    if(spd ==="")
        spd = 0;
    if(agl ==="")
        agl = 0;
    $("#strmeter").text(str);
    $("#defmeter").text(def);
    $("#spdmeter").text(spd);
    $("#aglmeter").text(agl);
}

function item(name, lvl, str, def, spd, agl) {
	this.lvl = lvl;
	this.name = name;
	this.str = str;
	this.def = def;
	this.spd = spd;
	this.agl = agl;
}
	

