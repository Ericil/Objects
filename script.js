//from Sean's Hw #3 folder

var c = document.getElementById("slate");
var ctx = c.getContext("2d");
var clearbutton = document.getElementById("clear");
var start = document.getElementById("start");
var stop = document.getElementById("stop");

var frameid;

ctx.fillstyle = "#ff0000";
var draw = function() {
	var reverseX = true; //true means go left, false means go right
	var reverseY = true; //true means go north, false means go south
	var xcor =100;
	var ycor =100;
	var radius = 5;
	window.cancelAnimationFrame(frameid);
	var animate = function() {
		ctx.clearRect(0,0,c.width,c.height);
		ctx.beginPath();
		ctx.arc(xcor,ycor,radius,0,2*Math.PI);
		ctx.fill();
		if (xcor + radius >= c.width) {
			reverseX = true;
		}
		else if (xcor - radius <= 0) {
			reverseX = false;
		}
		if (ycor + radius >= c.height) {
			reverseY = false;
		}
		else if (ycor - radius <= 0) {
			reverseY = true;
		}
		if (reverseX){
			xcor -=1;
		}
		else {
			xcor +=1;
		}
		if (reverseY){
			ycor +=1;
		}
		else {
			ycor -=1;
		}
		frameid = window.requestAnimationFrame(animate);
	};
	animate();
}
		
var stopdraw = function() {
	window.cancelAnimationFrame(frameid);
	}
var clear = function(e) {
	e.preventDefault();
	ctx.clearRect(0,0,c.width,c.height);
}
start.addEventListener("click",draw);
stop.addEventListener("click",stopdraw);
clearbutton.addEventListener("click", clear);
