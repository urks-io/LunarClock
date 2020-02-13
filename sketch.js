//goals/todo:
/* - make sphere follow inside of cone-- up is full, down is 
* down is new moon (maybe make it go out of cone partially to be hidden?)
* -- phase is the distance of moon from the camera
*/

let detailX;
let detailY;

var angle = 0;	// initialize angle variable
var scalar = 0.001;  // set the radius of circle
var speed = 0.0001;	// set the speed of growth for the spirals
var startX = 00;	// set the x-coordinate for the circle center
var startY = 00;	// set the y-coordinate for the circle center
var startZ = 00;


let lunarSecond // = (0.984352966671 * second()); // 1 ∇S = 0.9843529666671 Terrarian Seconds
let lunarMinute;
let lunarHour;
let cx, cy;

let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

let phase;
let img;
let vid;



function preload(){
	vid = createVideo("MOONMAN.mp4");
}



function setup() {
  createCanvas(720, 720, WEBGL);
  stroke(255);
 
//perspective(PI / 3.0, width / height, 0.1, 500);
  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width/2;
  cy = height/2;

  angleMode(DEGREES);

  //   detailX = createSlider(3, 24, 3);
  // detailX.position(10, height + 5);
  // detailX.style('width', '80px');

  //  detailY = createSlider(3, 24, 3);
  // detailY.position(20, height + 15);
  // detailY.style('width', '80px');
}

function draw() {
  background(0);
  camera(220, 220, 120+ (frameCount*0.07), 0, 0, 0, 0, 10, 0);
  orbitControl();
  

  push();
  stroke(44);
  rotateX(90);
  rotateY(90);
  rotateZ(180);
  texture(vid);
  vid.hide();
  cone(cx*2, cy*3, 16, 16, false);
  pop();


  push();
  stroke(5);
  normalMaterial();
  phase++;

  x = startX + scalar * cos(angle);
  y = startY + scalar * sin(angle);
  z = startZ + scalar * tan(angle);
  zx = startZ + scalar *sin(angle);
  
  

if (frameCount < 5000){
  translate(x, y, zx);
}else {
angle = 0;	
scalar = 0.001; 
speed = 0.0001;
frameCount = 0;
}
 

  sphere(cy/5, 6, 3);
 // sphere(cy/5, 3+detailX, 3+detailY);
angle++;
scalar += speed;
speed += 0.00005;
  pop();


push();
texture(vid);
translate(x*-0.984352966671, y*-0.984352966671, z);
sphere(cy/6, 4, 4);
pop();




  translate(-360, -360);

  let s = map(second(), 0, 60, 0, 360) - 90;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, 360) - 90;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, 360 * 2) - 90;

  // Draw the hands of the clock
  stroke(255,20,147)
  strokeWeight(2);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(8);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
  //ellipse(0, 0, 30);
  // Draw the minute ticks
   push();
  strokeWeight(8);
  rotateX(260);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
   // vertex(x, y);

  }
  pop();
  endShape();

// i = day();
//   if(i = 1)
}


function mousePressed(){
	vid.loop();
	
}

function keyPressed(){
	let fs = fullscreen();
    fullscreen(!fs); 
}