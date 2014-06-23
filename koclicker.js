//Used variables
var str;
var def;
var spd;
var agl;
var money;

var gain_counter;

var str_rate;
var def_rate;
var spd_rate;
var agl_rate;

var items;
var usern;
var inv;
var health;
var curHealth;

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
	money = 100;
	
	health = 50;
	curHealth = 50;
	shop = [];
	inv = [];
	usern = askUsername();
	createShopItems();
}

function playGame() {
	setListeners();
	updateStats();
	setShop();
	setOpponents();
	enableGainsPS()	
}

function enableGainsPS() {
	gains_counter = setInterval(function(){ gainsPerSecond(); }, 1000);
}

function disableGainsPS() {
	clearInterval(gains_counter);
}

function gainsPerSecond() {

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
	
	if (curHealth < health) { 
		curHealth++; 
	}

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

function setOpponents() {
	updateOpponents();
}

// Init shop items on new game
function createShopItems() {
	shop = [];
	shop.push(new item("Gloves",20, 1,  2, 0, 0, 0));
	shop.push(new item("Shield",40, 1,  0, 2, 0, 0));
	shop.push(new item("Shoes", 10, 1, 0, 0, 2, 1));
	shop.push(new item("Potion", 5, 1, 0.1, 0.1, 0.1, 0.1));
}

// Update items in the shop list
function updateItems() {
	var shopDiv = $("#shop");
	var shopCode = "";
	for (var i = 0; i < shop.length; i++) {
		shopCode += '<div class="shop_item">' + shop[i].name + '<br> level: ' 
					+ shop[i].lvl + '<br> Price: '+ shop[i].price +'<br> <button onclick="buyItem('+ i +')">Buy!</button></div>';
	}
	shopDiv.html(shopCode)
}

function updateOpponents() {
	var opp = $( "#opp" );
	var opp_code = "";
	for (var i = 0; i < enemies.length; i++) {
		opp_code += "<li class ='opp_item' onclick='initOpp(" + i + ")'>" + enemies[i].name + "</li><hr>";
	}
	opp.html(opp_code);
}

function initOpp(id) {
	var opp_div = $( "#opp_stats" );
	curEnemy = enemies[id];
	
	// Reset curHealth if needed
	curEnemy.curHealth = curEnemy.health;
	updateOppStats();
	opp_div.fadeIn(1000);
	$( "#battle_btn" ).fadeIn(1000);
}

function updateOppStats(id) {
	$("#opp_str").text("Strength: " + curEnemy.str);
	$("#opp_def").text("Defence: " + curEnemy.def);
	$("#opp_spd").text("Speed: " + curEnemy.spd);
	$("#opp_alg").text("Agility: " + curEnemy.agl);
	$("#totalhealth").text("Health: " + curHealth + "/" + health);
	$("#opp_health").text("Health: " + curEnemy.curHealth + "/" + curEnemy.health);
	$( "#battle_btn" ).html("<button onclick=initBattle('" + id + "')>Battle</button>")
	setHealthBarOpp(curEnemy.curHealth,curEnemy.health);

}

// Buy item from shop
function buyItem(id) {
	if (money >= shop[id].price) {
		money -= shop[id].price;
		inv[id] = shop[id];
	
		shop[id].lvl++;
		shop[id].str = Math.round(shop[id].str * 1.1);
		shop[id].def = Math.round(shop[id].def * 1.1);
		shop[id].spd = Math.round(shop[id].spd * 1.1);
		shop[id].agl = Math.round(shop[id].agl * 1.1);
		
		updateItems();
		updateStats();
	}
}

function updateStats() {
 	$("#totalstr").text("Strength: " + Math.round(str));
 	$("#totaldef").text("Defence: " + Math.round(def));
 	$("#totalspd").text("Speed: " + Math.round(spd) );
 	$("#totalagl").text("Agility: " + Math.round(agl));
  	$("#totalhealth").text("Health: " + curHealth + "/" + Math.round(health));
  	$("#totalcash").text("Money: " + Math.round(money));
  	setHealthBar(curHealth,health);
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
	$("#shop_title").click(function () {
		var div = $("#shop");
		var title = $("#shop_title");
		
		if (div.is(":hidden")) {
			title.html("Shop: &#8595;");
		} else {
			title.html("Shop: &#8594;");
		}
		
	    div.slideToggle();
	});
	
	$("#opp_title").click(function () {
		var div = $("#opp");
		var title = $("#opp_title");
		
		if (div.is(":hidden")) {
			title.html("Opponents: &#8595;");
		} else {
			title.html("Opponents: &#8594;");
		}
		
	    div.slideToggle();
	});

	// Non-specific listeners
	$("#save").click(function () {
		console.log("-- Save the game --")
		storeVariables();
	});
	
	$("#del").click(function () {
		console.log("-- Delete save game --")
		eraseCookie(usern);
	});
	
	$("#test").click(function () {
		curHealth -= 1;
		updateStats();
	});
}

function storeVariables() {
	setCookie("str", str, 365);
	setCookie("def", def, 365);
	setCookie("spd", spd, 365);
	setCookie("agl", agl, 365);
	setCookie("health", health, 365);
	setCookie("curHealth", curHealth, 365);
	setCookie("money", money, 365);
	setCookie("shop", JSON.stringify(shop), 365);
	setCookie("inv", JSON.stringify(inv), 365);
}

// Load player (when cookie present) variables
function loadVariables(){
    str = getCookie("str");
    def = getCookie("def");
    spd = getCookie("spd");
    agl = getCookie("agl");
    health = getCookie("health");
    curHealth = getCookie("curHealth");
    shop = getCookie("shop");
    inv = getCookie("inv");
    money = getCookie("money");
    
    if (str === "") {str = 0};
    if (def === "") {def = 0};
    if (spd === "") {spd = 0};
    if (agl === "") {agl = 0};
    if (health === "") {health = 10};
    if (curHealth === "") {curHealth = 50};
    if (money === "") {money = 100};
    
    console.log(shop);
    if (shop === "") {
    	console.log("empty shop");
    	createShopItems();
    } else {
    	shop = JSON.parse(shop);
    }
    
    if (inv === "") {
    	inv = [];
    } else {
    	inv = JSON.parse(inv);
    }
}

//Health based
function setHealthBar(cur, max){
	var per = (cur/max)*100;
	per = per+"%";
	$("#player_health_bar > div").animate({ width: per }, 500 );
}

function setHealthBarOpp(cur, max){
	var per = (cur/max)*100;
	per = per+"%";
	$("#opp_health_bar > div").animate({ width: per }, 500 );
}

// Constructor for item
function item(name, price, lvl, str, def, spd, agl) {
	this.price = price
	this.lvl = lvl;
	this.name = name;
	this.str = str;
	this.def = def;
	this.spd = spd;
	this.agl = agl;
}

// Match related stuff:
//-------------------------
var enemy1 = {name: "Walking Turd",img: "walkingturd.png", health:10, curHealth:10, str:10, def:10, spd:10, agl:10 };
var enemy2 = {name: "Stick Man", img: "stickman.png", health:100, curHealth:100, str:1, def:100, spd:1, agl:1 };
var enemies = [enemy1, enemy2];


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


