var pic = document.getElementById("vimg");
var clearbutton = document.getElementById("clear");
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var dict = {};
var list = [];
var current = 0;
var id =[];


var bounceC = function() {
    var number = current;
    var frameid;
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var radius = Math.floor(Math.random()*10) + 10;
    var xcor = Math.floor(Math.random()*400) + 50;
    var ycor = Math.floor(Math.random()*200) + 50;
    var getc = function(){
    	return c;
    }
    var getx = function(){
    	return xcor;
    }
    var gety = function(){
    	return ycor;
    }
    var getr = function(){
    	return radius;
    }
    var getn = function(){
	return number;
    }
    var xchange = 1;
    var ychange = 1;
    var color= '#'+Math.floor(Math.random()*16777215).toString(16);
    var animate = function() {
	//if you reach width limits
	var aroundx = false;
	var aroundy = false;
	//they sometimes glitch
	for (others in dict){
	    if (dict[others].getn() != getn()){
		var otherx = dict[others].getx();
		var othery = dict[others].gety();
		var otherr = dict[others].getr();
		var tx = getx();
		var ty = gety();
		var tr = getr();
		if (Math.pow(otherx - tx, 2)  + Math.pow(othery - ty, 2) <= Math.pow(otherr + tr, 2)){
		    var angle = Math.atan(Math.abs(othery - ty)/Math.abs(otherx - tx));
		    if (angle <= 1 && angle >= -1){
			aroundy = true;
		    }else{
			aroundx = true;
		    }
		}
	    }
	}
	if (xcor + radius == 500 || xcor - radius == 0 || aroundx){
	    xchange = xchange * -1;
	}
	//if you reach height limits
	if (ycor + radius == 300 || ycor - radius == 0 || aroundy){
	    ychange = ychange * -1;
	}
	c.setAttribute( "cx", xcor + xchange );
	c.setAttribute( "cy", ycor + ychange );
	c.setAttribute( "r", radius );
	c.setAttribute( "fill", color);
	c.setAttribute( "stroke", "black" );
	pic.appendChild(c);
	xcor += xchange;
	ycor += ychange;
    };
    return {
    getc:getc,
	getn:getn,
	getx:getx,
	gety:gety,
	getr:getr,
	number:number,
	animate:animate
    }
}

function create() {
    var hold = bounceC();
    hold.number = current;
    var frameid = setInterval(hold.animate,10);
    dict[current] = hold;
    id.push(frameid);
    //list.push(hold);
    current++;
    console.log(dict);
    for (x in dict){
	console.log(x);
    }
}

function clear(){
    console.log("clear");
    //dict = {};
    console.log(dict);
    //while (pic.lastChild) {
	//console.log(pic.lastChild);
	//pic.removeChild(pic.lastChild);
    //}
    //console.log(pic)
    for (other in dict){
    	pic.removeChild(dict[other].getc());
    }
    dict={};
    console.log(id);
    for (x in id){
    	console.log(x);
    	clearInterval(id[x]);
    }
}
    
start.addEventListener("click",create);
clearbutton.addEventListener("click", clear);
