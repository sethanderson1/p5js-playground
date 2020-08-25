
let width = 200;
let height = 400;
let numBalls = 5;
let spring = 0.1;
let gravity = 0;
let friction = -1;
let balls = [];
let color = [20, 0, 0,0.4]; 
// let overlap = 0;

function setup() {
  // frameRate(2);
  createCanvas(width, height);
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(100, width - 100),
      random(100, height - 100),
      30+10*i,
      i,
      balls,
      [50, 50, 0],
      []
    );
  }
}

function draw() {
  background(20);
  balls.forEach(ball => {
    ball.collide();
    ball.colors();
    ball.move();
    ball.display();
    // if (ball.id === 0) {
    //   console.log(ball)
    // }
  });
}

class Ball {
  constructor(xin, yin, din, idin, oin, color, overlap) {
    this.x = xin;
    this.y = yin;
    this.vx = 10;
    this.vy = 10;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.color = color;
    this.overlap = overlap;

  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      let overlapping = distance < minDist;
      // console.log([this.id, overlapping])
      if (overlapping) {
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax*0.5;
        this.vy -= ay*0.5;
        this.others[i].vx += ax*0.5;
        this.others[i].vy += ay*0.5;
        this.overlap.push(1);
        this.others[i].overlap.push(1)
      }
    }
    // console.log(this.id)

  }

  colors() {
    if (this.overlap.some(a => a === 1)) {
      this.color = [150, 0, 0];
    } else {
      this.color = [50, 50, 50];
    }
    this.overlap = []

  }
  move() {
    this.vy += gravity;
    this.x += this.vx/10 ;
    this.y += this.vy/10 ;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
