var s = function (p) {



  let numBalls = 2;
  let spring = 0.1;
  let gravity = 0;
  let friction = -1;
  let balls = [];
  let color = [20, 0, 0, 0.4];
  // let overlap = 0;

  p.setup = function () {
    // frameRate(2);
    // let p.width = 500;
    // let p.height = 200;
    p.createCanvas(p.width, p.height);
    for (let i = 0; i < numBalls; i++) {
      balls[i] = new Ball(
        Math.random(100, p.width - 100),
        Math.random(100, p.height - 100),
        30 + 10 * i,
        i,
        balls,
        [50, 50, 0],
        []
      );
    }
  }

  p.draw = function () {
    p.background(20);
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
          this.vx -= ax * 0.5;
          this.vy -= ay * 0.5;
          this.others[i].vx += ax * 0.5;
          this.others[i].vy += ay * 0.5;
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
      this.x += this.vx / 10;
      this.y += this.vy / 10;
      if (this.x + this.diameter / 2 > p.width) {
        this.x = p.width - this.diameter / 2;
        this.vx *= friction;
      } else if (this.x - this.diameter / 2 < 0) {
        this.x = this.diameter / 2;
        this.vx *= friction;
      }
      if (this.y + this.diameter / 2 > p.height) {
        this.y = p.height - this.diameter / 2;
        this.vy *= friction;
      } else if (this.y - this.diameter / 2 < 0) {
        this.y = this.diameter / 2;
        this.vy *= friction;
      }
    }

    display() {
      p.fill(this.color);
      p.ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  }

}
var myp5 = new p5(s, 'c1');


// // save this file as sketch.js
// // Sketch One
// var s = function( p ) { // p could be any variable name
//   var x = 100; 
//   var y = 100;
//   p.setup = function() {
//     p.createCanvas(400, 200);
//   };

//   p.draw = function() {
//     p.background(0);
//     p.fill(255);
//     p.rect(x,y,50,50);
//   };
// };
// var myp5 = new p5(s, 'c1');
