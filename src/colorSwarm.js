// color swarm - when balls touch they change color 
// ball1 changes ball2's color
// ball2 changes ball3's color
// ball3 changes ball1's color

const sketch = (p) => {

    let width = window.innerWidth;
    let height = window.innerHeight;

    const numBalls = 3;
    const ballDiameter = 250;
    const diameterChange = 1;
    const spring = 2;
    const speedThreshold = 4;
    const gravity = 0;
    const friction = -1;
    const balls = [];

    const alphaForBall = 255; // between 0 and 255
    const colorZero = [150, 80, 80, alphaForBall];
    const colorOne = [80, 150, 80, alphaForBall];
    const colorTwo = [80, 80, 150, alphaForBall];

    let ballStartColor = colorZero;
    let infectedZero = true;
    let infectedOne = false;
    let infectedTwo = false;

    const { xCoords, yCoords } = generateInitialBallPositions(numBalls, width, height)

    p.setup = () => {
        // p.frameRate(10);
        p.createCanvas(width, height);
        p.drawBackground();
        // p.setupPosition();
        for (let i = 0; i < numBalls; i++) {
            // if (i >= Math.floor(1/3*numBalls)) {
            if (i % 3 === 1) {
                infectedZero = false;
                infectedOne = true;
                infectedTwo = false;
                ballStartColor = colorOne;
            }
            // if (i >= Math.floor(2/3*numBalls)) {
            if (i % 3 === 2) {
                infectedZero = false;
                infectedOne = false;
                infectedTwo = true;
                ballStartColor = colorTwo;
            }
            if (i % 3 === 0) {
                infectedZero = true;
                infectedOne = false;
                infectedTwo = false;
                ballStartColor = colorZero;
            }
            balls[i] = new Ball(
                xCoords[i],
                yCoords[i],
                ballDiameter,
                i,
                balls,
                ballStartColor,
                overlap,
                infectedZero,
                infectedOne,
                infectedTwo
            );
        }

        p.noStroke();

    };

    // p.setupPosition = () => {
    //     // let x = p.windowWidth / 2;
    //     // let y = p.windowHeight / 2;
    // };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.drawBackground();
        p.setupPosition();
    };

    p.drawBackground = () => {
        p.background(0);
    };

    p.draw = () => {
        p.background(255);
        balls.forEach(ball => {
            ball.collide();
            ball.move();
            ball.display();
        });
        // console.log('frameRate', p.frameRate())
    };

    class Ball {
        constructor(xin, yin, din, idin, oin, color, overlap, infectedZero, infectedOne, infectedTwo) {
            this.x = xin;
            this.y = yin;
            this.vx = p.random(-1, 1);
            this.vy = p.random(-1, 1);
            this.diameter = din;
            this.id = idin;
            this.others = oin;
            this.color = color;
            this.overlap = false;
            this.infectedZero = infectedZero;
            this.infectedOne = infectedOne;
            this.infectedTwo = infectedTwo;
        }

        collide() {

            let otherBalls = [];
            for (let l = 0; l < numBalls; l++) {
                otherBalls.push((this.id + l) % numBalls);
            }
            otherBalls = otherBalls.filter(el => el !== this.id)
            let i;
            for (let m = 0; m < otherBalls.length; m++) {
                i = otherBalls[m];
                let dx = this.others[i].x - this.x;
                let dy = this.others[i].y - this.y;
                let distance = p.sqrt(dx * dx + dy * dy);
                let minDist = this.others[i].diameter / 2
                    + this.diameter / 2;
                let overlapping = distance <= minDist*1.01;
                // console.log('overlapping', overlapping)
                if (overlapping) {

                    let angle = p.atan2(dy, dx);
                    let targetX = this.x + p.cos(angle) * minDist;
                    let targetY = this.y + p.sin(angle) * minDist;
                    let ax = (targetX - this.others[i].x) * spring;
                    let ay = (targetY - this.others[i].y) * spring;
                    this.vx -= ax;
                    this.vy -= ay;
                    this.others[i].vx += ax;
                    this.others[i].vy += ay;

                    if (this.vx > 0) {
                        this.vx = this.vx > speedThreshold
                            ? speedThreshold : this.vx;
                    }
                    if (this.vx < 0) {
                        this.vx = this.vx < -speedThreshold
                            ? -speedThreshold : this.vx;
                    }

                    if (this.vy > 0) {
                        this.vy = this.vy > speedThreshold
                            ? speedThreshold : this.vy;
                    }
                    if (this.vy < 0) {
                        this.vy = this.vy < -speedThreshold
                            ? -speedThreshold : this.vy;
                    }

                    if (this.others[i].vx > 0) {
                        this.others[i].vx =
                            this.others[i].vx > speedThreshold
                                ? speedThreshold : this.others[i].vx;
                    }
                    if (this.others[i].vx < 0) {
                        this.others[i].vx =
                            this.others[i].vx < -speedThreshold
                                ? -speedThreshold : this.others[i].vx;
                    }

                    if (this.others[i].vy > 0) {
                        this.others[i].vy =
                            this.others[i].vy > speedThreshold
                                ? speedThreshold : this.others[i].vy;
                    }
                    if (this.others[i].vy < 0) {
                        this.others[i].vy =
                            this.others[i].vy < -speedThreshold
                                ? -speedThreshold : this.others[i].vy;
                    }

                    // console.log(`collision occured between ${this.id}
                    // and ${this.others[i].id}`, this)
                    // console.log('this.id', this.id)
                    // console.log('this.others[i].id', this.others[i].id)
                    // console.log('i', i)
                    // console.log('p.frameCount', p.frameCount)
                    if (this.infectedZero === true
                        && this.others[i].infectedOne === true) {
                        this.diameter = this.diameter / diameterChange;
                        this.others[i].color = colorZero;
                        this.others[i].infectedZero = true;
                        this.others[i].infectedOne = false;
                    } else if (this.infectedOne === true
                        && this.others[i].infectedTwo === true) {
                        this.diameter = this.diameter * diameterChange;
                        this.others[i].color = colorOne;
                        this.others[i].infectedOne = true;
                        this.others[i].infectedTwo = false;
                    } else if (this.infectedTwo === true
                        && this.others[i].infectedZero === true) {
                        this.diameter = Math.random() < 0.5
                            ? this.diameter * diameterChange
                            : this.diameter / diameterChange;
                        this.others[i].color = colorTwo;
                        this.others[i].infectedTwo = true;
                        this.others[i].infectedZero = false;
                    }
                }
            }
        }

        move() {
            this.vy += gravity;
            this.x += this.vx / 2;
            this.y += this.vy / 2;
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

            const word = this.id.toString();

            p.fill(this.color);
            p.ellipse(this.x, this.y, this.diameter, this.diameter);

            p.textSize(32);
            p.fill(50);
            p.text(word, this.x, this.y);
        }
    }
};



function generateInitialBallPositions(numBalls, width, height) {
    const ballsPerRow = Math.ceil(Math.sqrt(numBalls));
    const rowScaleDenom = ballsPerRow + 1;
    const xSpacing = width / rowScaleDenom;

    const ballsPerCol = Math.ceil(Math.sqrt(numBalls));
    const colScaleDenom = ballsPerCol + 1;
    const ySpacing = height / colScaleDenom;
    const xCoords = [];
    const yCoords = [];

    for (let i = 0; i < ballsPerRow; i++) {
        for (let j = 0; j < ballsPerCol; j++) {
            yCoords.push(ySpacing * (j + 1));
            xCoords.push(xSpacing * (i + 1));
        }
    }

    return { xCoords, yCoords }
}

function ballsCollided(ball) {

}

function refractory() {

}

function overlap() {

}

function endOverlap() {

}





export default sketch









