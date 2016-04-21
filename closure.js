var pic = document.getElementById("vimg");
var clearbutton = document.getElementById("clear");
var start = document.getElementById("start");
var stop = document.getElementById("stop");



var bounceC = function() {
	var frameid;
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	var radius = Math.floor(Math.random()*10) + 10;
	var xcor = Math.floor(Math.random()*400) + 50;
	var ycor = Math.floor(Math.random()*200) + 50;
	var xchange = 1;
	var ychange = 1;
	var color = '#'+Math.floor(Math.random()*16777215).toString(16)
	var animate = function() {
		//if you reach width limits
		if (xcor + radius == 500 || xcor - radius == 0){
			xchange = xchange * -1;
		}
		//if you reach height limits
		if (ycor + radius == 300 || ycor - radius == 0){
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
		animate:animate
	}
}

var create = function() {
	var b = bounceC();
	setInterval(b.animate,10);
	}
start.addEventListener("click",create);
