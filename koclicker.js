var str = 0;
var def = 0;
var spd = 0;
var agl = 0;

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
$(document).ready(function(){
$("#weaponsO").click(function () {
    $("#glove").slideUp();
    $("#weapons").slideToggle();
});

$("#gloveO").click(function () {
    $("#weapons").slideUp();
    $("#glove").slideToggle();
});
});