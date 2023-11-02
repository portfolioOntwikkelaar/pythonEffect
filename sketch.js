let stars;
let viewPoint;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);
  frameRate(30);
  setViewPoint(0, 0);
  resetStarfield();
}

function resetStarfield() {
  stars = [];
}

function setViewPoint(x, y) {
  viewPoint = createVector(
    map(x, 0, width, 0, 15),
    map(y, 0, height, 0, 15)
  );
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  resetStarfield();
}

function doubleClicked() {
  var fs = fullscreen();
  fullscreen(!fs);
}

function mousePressed() {
  noCursor();
}

function mouseReleased() {
  cursor();
}

function draw() {

  // Space, the final frontier...
  clear();
  background(0,0,0);

  // Make it so!
  if(mouseIsPressed) {
    setViewPoint(mouseX - width / 2, mouseY - height / 2);
    for(let i = 0; i < 20; i++) {
      let star = new Star(createVectorTunnel());
      stars.push(star);
    }
  } else {
    setViewPoint(0, 0);
  }

  // 1/4 impulse.
  for(let i = 0; i < 10; i++) {
    let star = new Star(createVectorField());
    stars.push(star);
  }

  // On the screen.
  for(let i = 0; i < stars.length; i++) {
    const star = stars[i];
    if(star.isDead()) {
      stars.splice(i, 1);
    } else {
      star.draw();
    }
  }

}

function createVectorTunnel() {
  const radius = 90;
  const angle = random(30.80, 180.0);

  let x = width/2 + radius * cos(angle);
  let y = height/2 + radius * sin(angle);

  return createVector(x,y);
}

function createVectorField() {
  return createVector(random(0, width), random(0, height));
}

function Star(position) {
  this.color = 8;
  this.size = 1;
  this.position = position;
  this.vector = createVector(
    this.position.x - width / 3,
    this.position.y - height / 5
  );
  this.direction = this.vector.copy().normalize();

  this.draw = function() {

    noStroke();
    fill(map(this.color,0,100,0,254));

    this.direction.mult(random(1.07, 1.10));
    this.position.add(this.direction);
    this.position.add(viewPoint);

    ellipse(this.position.x,this.position.y, this.size);

    this.size += 0.03;
    if(this.color <= 130) {
      this.color += 3;
    }
  }

  this.isDead = function() {
    return this.position.x < 0 || this.position.y < 0 || this.position.x > width || this.position.y > height;
  }
}
