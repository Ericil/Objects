var pic = document.getElementById("vimg");
var clearbutton = document.getElementById("clear");
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var deleting = document.getElementById("delete");
var accel = document.getElementById("accel");
var fil = document.getElementById("filter");
var dict = {};
var list = [];
var current = 0;
var id =[];


var bounceC = function() {
    var number = current;
    var frameid;
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var radius = Math.floor(Math.random()*20) + 10;
    var xcor = Math.floor(Math.random()*400) + 50;
    var ycor = Math.floor(Math.random()*200) + 50;
    var xchange = 1;
    var ychange = 1;
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
    var getxchange = function(){
	return xchange;
    }
    var getychange = function(){
	return ychange;
    }

    var setxchange = function(setting){
	xchange = setting;
    }
    var setychange = function(setting){
	ychange = setting;
    }
    var color= '#'+Math.floor(Math.random()*16777215).toString(16);
    var animate = function() {
	//if you reach width limits
	var aroundx = false;
	var aroundy = false;
	//they sometimes glitch
	for (others in list){
	    if (list[others].getn() != getn()){
		var otherx = list[others].getx();
		var othery = list[others].gety();
		var otherr = list[others].getr();
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
	if (xcor + radius >= 500 || xcor - radius <= 0 || aroundx){
	    xchange = xchange * -1;
	}
	//if you reach height limits
	if (ycor + radius >= 300 || ycor - radius <= 0 || aroundy){
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
	setxchange:setxchange,
	setychange:setychange,
	getxchange:getxchange,
	getychange,getychange,
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
    list[current] = hold;
    id.push(frameid);
    //list.push(hold);
    current++;
}

function clear(){
    for (other in list){
    	pic.removeChild(list[other].getc());
    }
    list = [];
    for (x in id){
    	clearInterval(id[x]);
    }
}

function remove(){
    if (list.length != 0){
	pic.removeChild(list[current-1].getc());
	clearInterval(id[current-1]);
	list.pop();
	id.pop();
	current--;
    }else{
	console.log("stop pressing this button");
	return;
    }
}

function accelerate(){
    if (list.length != 0){
	list.map(function(x) {
	    x.setxchange(x.getxchange() * 2);
	    x.setychange(x.getychange() * 2);
	    return x;
	});
    }
}

function filter(){
    var hold = [];
    if (list.length != 0){
	hold = list.filter(function(x){
	    return (x.getr() >= 20);
	});
	console.log(hold);
	console.log(hold[0].getn());
	if (hold != 0){
	    list.map(function(x){
		for (a in hold){
		    console.log(a.getn());
		    if (x == a){
			console.log("if");
			x.setxchange(0);
			x.setychange(0);
			return x;
		}
	    }
	});
	}
    }
}
	


accel.addEventListener("click", accelerate);
deleting.addEventListener("click", remove);
start.addEventListener("click",create);
clearbutton.addEventListener("click", clear);
fil.addEventListener("click", filter);
