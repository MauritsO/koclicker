//Used variables
var str;
var def;
var spd;
var agl;
var money;

var str_rate;
var def_rate;
var spd_rate;
var agl_rate;

var items;
var loc;
var usern;
var inv;
var health;

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
	money = 0;
	
	health = 50;
	shop = [];
	inv = [];
	usern = askUsername();
	loc = "gym"
	createShopItems();
}

function playGame() {
	setListeners();
	updateStats();
	setShop();
	window.setInterval(function(){ 
	    gainsPerSecond();  
	}, 1000);
	
}

function gainsPerSecond() {
	console.log("Gains");
	str_rate = 0;
	def_rate = 0;
	spd_rate = 0;
	agl_rate = 0;

	for (var i = 0; i < inv.length; i++) {
		if (typeof inv[i] !== "undefined") {
			str_rate += inv[i].str;
			def_rate += inv[i].def;
			spd_rate += inv[i].spd;
			agl_rate += inv[i].agl;
		}
	}
	str = +str + str_rate;
	def = +def + def_rate;
	spd = +spd + spd_rate;
	agl = +agl + agl_rate;
	console.log(str);
	
	updateStats();
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

// Render shop
function setShop() {
	updateItems();
}

// Init shop items on new game
function createShopItems() {
	shop = [];
	shop.push(new item("Gloves", 1,  2, 0, 0, 0));
	shop.push(new item("Shield", 1,  0, 2, 0, 0));
	shop.push(new item("Shoes", 1, 0, 0, 2, 1));
	shop.push(new item("Potion", 1, 0.1, 0.1, 0.1, 0.1));
}

// Update items in the shop list
function updateItems() {
	shopDiv = $("#items");
	var shopCode = "";
	for (var i = 0; i < shop.length; i++) {
		shopCode += '<li id = "' + i + '"onclick="buyItem(this)">' + shop[i].name + '(level: ' + shop[i].lvl + ')</li>';
	}
	shopDiv.html(shopCode)
}

// Buy item from shop
function buyItem(elem) {
	var id = elem.id;
	inv[id] = shop[id];

	shop[id].lvl++;
	shop[id].str = Math.round(shop[id].str * 1.1);
	shop[id].def = Math.round(shop[id].def * 1.1);
	shop[id].spd = Math.round(shop[id].spd * 1.1);
	shop[id].agl = Math.round(shop[id].agl * 1.1);
	
	updateItems();
	updateStats();
}

function updateStats() {
 	$("#totalstr").text("Strength: " + Math.round(str));
 	$("#totaldef").text("Defence: " + Math.round(def));
 	$("#totalspd").text("Speed: " + Math.round(spd));
 	$("#totalagl").text("Agility: " + Math.round(agl));
  	$("#totalhealth").text("Health: " + Math.round(health));
  	$("#totalcash").text("Money: " + Math.round(money));
}


function setListeners() {
	// Gym-specific listeners
	$("#str").click(function () {
	    str++;
	    updateStats();
	});
	
	$("#def").click(function () {
	    def++;
	    updateStats();
	});
	
	$("#spd").click(function () {
	    spd++;
	    updateStats();
	});
	
	$("#agl").click(function () {
	    agl++;
	    updateStats();
	});
	
	// Shop-specific listeners
	$("#weaponsO").click(function () {
	    $("#glove").slideUp();
	    $("#items").slideToggle();
	});
	
	$("#gloveO").click(function () {
	    $("#items").slideUp();
	    $("#glove").slideToggle();
	});
	
	// Non-specific listeners
	$("#save").click(function () {
	    setCookie("str", str, 365);
	    setCookie("def", def, 365);
	    setCookie("spd", spd, 365);
	    setCookie("agl", agl, 365);
	    setCookie("health", health, 365);
	    setCookie("shop", JSON.stringify(shop), 365);
	    setCookie("inv", JSON.stringify(inv), 365);
	});
	
	$("#bat").click(function () {
		playBattle();
	});
	
	$("#del").click(function () {
		eraseCookie(usern);
	});
}

// Load player (when cookie present) variables
function loadVariables(){
    str = getCookie("str");
    def = getCookie("def");
    spd = getCookie("spd");
    agl = getCookie("agl");
    health = getCookie("health");
    shop = getCookie("shop");
    inv = getCookie("inv");
    
    if(str === "")
        str = 0;
    if(def === "")
        def = 0;
    if(spd === "")
        spd = 0;
    if(agl === "")
        agl = 0;
    if(health === "")
        health = 10;
    if (shop === "") {
    	shop = [];
    } else {
    	shop = JSON.parse(shop);
    }
    
    if (inv === "") {
    	inv = [];
    } else {
    	inv = JSON.parse(inv);
    }
}

// Constructor for item
function item(name, lvl, str, def, spd, agl) {
	this.lvl = lvl;
	this.name = name;
	this.str = str;
	this.def = def;
	this.spd = spd;
	this.agl = agl;
}

// Match related stuff:
//-------------------------
var enemy1 = {health:10, strength:3};
var enemy2 = {health:20, strength:15};
var enemy3 = {health:30, strength:100};
var enemy = [enemy1, enemy2, enemy3]; //list of enemies

var n = 0; // 0 is the first enemy in the list.

function playBattle() {
	console.log("Arrived at battle");
    alert("You have gone to battle");
    if (str > enemy[n].strength && enemy[n].strength < health) {
    	alert("gj you won some money!");
    	money++;
    	n++; // if the enemy is beaten it will go on to the next enemy in the list
	} else {
		alert("Lost, nub. The enemy has strength " + enemy[n].strength + " and you only have strength " + str);
	}
}

// Cookie related stuff:
//-------------------------
// Check if cookie in browser cache
function isCookie() {
	var user=getCookie("username");
	if (user!=="") {
		usern = user;
		return true;
	} else {
		return false;
	}
}

// Save value to cookie
function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

// get value from cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)===0) return c.substring(name.length,c.length);
	}
	return "";
}

function eraseCookie(name) {
	document.cookie = "username=" + name + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}


