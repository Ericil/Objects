var pic = document.getElementById("vimg");
var clearbutton = document.getElementById("clear");
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var dict = {};
var list = [];
var current = 0;


var bounceC = function() {
    var number = current;
    var frameid;
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var radius = Math.floor(Math.random()*10) + 10;
    var xcor = Math.floor(Math.random()*400) + 50;
    var ycor = Math.floor(Math.random()*200) + 50;
    var getx = function(){
    	return xcor;
    }
    var gety = function(){
    	return ycor;
    }
    var getr = function(){
    	return radius;
    }
    var xchange = 1;
    var ychange = 1;
    var color= '#'+Math.floor(Math.random()*16777215).toString(16);
    var animate = function() {
	//if you reach width limits
	var aroundx = false;
	var aroundy = false;
	//this is what should bounce the balls off each other, but i cant seem to access any of the variables in each Object, just returns undefined
	for (others in dict){
	    if (xchange == 1){
		if (others.getx - others.getr <= xcor + radius){
		    aroundx = true;
		}else{
		    aroundx = false;
		}
	    }else{
		if (others.getx + others.getr >= xcor - radius){
		    aroundx = true;
		}else{
		    aroundx = false;
		}
	    }
	    if (ychange == 1){
		if (others.gety + others.getr >= ycor - radius){
		    aroundy = true;
		}else{
		    aroundy = false;
		}
	    }else{
		if (others.gety - others.getr <= ycor + radius){
		    aroundy = true;
		}else{
		    aroundy = false;
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
    setInterval(hold.animate,10);
    dict[current] = hold;
    //list.push(hold);
    current++;
    console.log(dict);
    for (x in dict){
	console.log(x);
    }
}

    
start.addEventListener("click",create);
