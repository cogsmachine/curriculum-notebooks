var v1;
var slider;
var s;
var px;
var py;
var scl = 18;
var check = 0;
var check2 = 1;
var particle_num = 15**2;
var p = [];

function setup() {
    createCanvas(400, 400);
    for (var i = 0; i< particle_num; i++){
      p[i] = new particle();
    }
    slider = createSlider(-100,200,-100);  
}
var nHeight = 345;

function draw() {
  background(255);
  stroke(0);
  strokeWeight(1);
  line(0,nHeight,0,0);
  line(width,0,0,0);
  line(width-2,nHeight,0,nHeight);
  line(width-1,nHeight,width-1,0);

  slider.position(180,370);
  noStroke();
  textFont("Helvetica");
  textSize(16);
  textStyle(BOLD);
  fill(0);
  text("Temperature", slider.x - 110, 380);
  var temp = str(slider.value()) + "\u00b0 C"; 
  text(temp + "", slider.x + slider.width, 380);

  s = slider.value();
  if (s <= 0){
   let m = 0;
   //create solid
   for (var j = 0; j < 15; j++){
     for (var i = 0; i < 15; i++){

      p[m].location.x =  80 + scl*i + (1.5-abs(s)/100)*random(-1,1);
      p[m].location.y = nHeight- 9 - scl*j + (1.5-abs(s)/100)*random(-1,1);
      p[m].display();
   
      m += 1
      }
    }
  }

  
  if (s > 0){
    if (check == 0 && s < 100){ 
      for (var i = 0; i < particle_num; i++){
        let gravity = createVector(random(-2,2), 0);
        p[i].velocity.y = 0;
        p[i].applyForce(gravity);
      }
      check = 1;
      check2 = 1;
    }
    if (check2 == 1 && s > 100){ 
      for (var i = 0; i < particle_num; i++){
        let gravity = createVector(0, random(-1,1));
        p[i].applyForce(gravity);
      }
      check2 = 0;
      check = 0;
    }

    for (var i = 0; i < p.length; i++){

      px = p[i].velocity.x;
      py = p[i].velocity.y;
      if (s != s1){
        p[i].velocity = createVector(px*(0.01 + s*0.05)/abs(px),py*(0.01 + s*0.05)/abs(py));

      }
      if (slider.value() == 0){
        px = 0.1;
        py = 0.1;
      }
      for (var j = 0; j < p.length; j++){
        var d = dist(p[i].location.x,p[i].location.y,p[j].location.x,p[j].location.y);
        if (i != j && d < 12 ){
          
          v1 = p[i].velocity;
          p[i].velocity = p[j].velocity;
          p[j].velocity = v1;
        }
      }
      p[i].update();
      p[i].display();
      p[i].checkEdges();  
    }
  }
  s1 = slider.value()
}





var particle = function() {
  this.location = createVector(0,0);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.r = 8;
};

particle.prototype.vibrate = function() {
  this.location.x += random(-10,10);
  this.location.y += random(-10,10);
};
  
particle.prototype.update = function() {
  this.location.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.acceleration.mult(0);
};


particle.prototype.display = function() {
  noStroke()
  fill(49,194,213,150);
  ellipse(this.location.x,this.location.y,this.r*2,this.r*2);
};

particle.prototype.applyForce = function(force) {
  this.acceleration.add(force);
};


particle.prototype.checkEdges = function() {
  if (this.location.x > width) {
    this.location.x = width;
    this.velocity.x *= -1;

  } else if (this.location.x < 0) {
    this.velocity.x *= -1;
    this.location.x = 0;
  }

  if (this.location.y > nHeight - 9) {
    this.velocity.y *= -1;
    this.location.y = nHeight - 9;
  }
  if (this.location.y < 0) {
    this.velocity.y *= -1;
    this.location.y = 0;
  }
};