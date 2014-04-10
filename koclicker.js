var str = 0;
var def = 0;
var spd = 0;
var agl = 0;
var usern = "";
var henk = {health:10, strength:str, defence:def, speed:spd, agility:agl};
var enemy1 = {health:10, strength:3};
var enemy2 = {health:20, strength:15};
var enemy3 = {health:30, strength:100};
var enemy = [enemy1, enemy2, enemy3]; //list of enemies


function add(){
    $("#str").click(function () {
    str++;
    $("#strmeter").text(str);
});
}

n=0; // 0 is the first enemy in the list.
$("#bat").click(function () {
    alert("You have gone to battle");
    if(str > enemy[n].strength && enemy[n].strength < henk.health)
        {alert("gj you won")
    n++; // if the enemy is beaten it will go on to the next enemy in the list
}
    else
        {alert("Lost, nub. The enemy has strength " + enemy[n].strength + " and you only have strength " + str)}
});


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

$("#weaponsO").click(function () {
    $("#glove").slideUp();
    $("#weapons").slideToggle();
});

$("#gloveO").click(function () {
    $("#weapons").slideUp();
    $("#glove").slideToggle();
});

$(".shop").hover(function () {
    $(this).css("background-color", "#eeeeee");
},

function () {
    $(this).css("background-color", "#e5eecc");
});

$(document).ready(function () {
    $("#wl").append("<div>" + "Shit" + "</div>");
    checkCookie();
    $("#user").text(usern);
    load();
});

$("#tt").blur(function(){
    $("#inp").text($(this).val());
});

$("#save").click(function(){
    setCookie("str",str,365);
    setCookie("def",def,365);
    setCookie("spd",spd,365);
    setCookie("agl",agl,365);
});

$("#load").click(function(){
    load();
});

$("#event").click(function(){
    var d=new Date();
    var t=d.toLocaleTimeString();
    $("<div />").text("EVENT! " + t).prependTo("#log");
});

function setCookie(cname,cvalue,exdays)
{
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++)
  {
  var c = ca[i].trim();
  if (c.indexOf(name)===0) return c.substring(name.length,c.length);
}
return "";
}

function checkCookie()
{
var user=getCookie("username");
if (user!=="")
  {
  usern = user;
  }
else
  {
  user = prompt("Please enter your name:","");
  if (user!=="" && user!==null)
    {
    setCookie("username",user,365);
    }
  }
}

function load(){
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