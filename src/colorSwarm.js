// color swarm - when balls touch they change color 

let colorSchemes = [
    ['#E8614F', '#F3F2DB', '#79C3A7', '#668065', '#4B3331'],
    ['#152A3B', '#158ca7', '#F5C03E', '#D63826', '#F5F5EB'],
    ['#0F4155', '#288791', '#7ec873', '#F04132', '#fcf068'],
    ['#152A3B', '#0D809C', '#F5C03E', '#D63826', '#EBEBD6'],
    ['#0F4155', '#5399A1', '#8CA96B', '#CB5548', '#E7E6F5'],
    ['#DBE5EC', '#336B87', '#2A3132', '#E94D35', '#EFAC55'],
    ['#8A867F', '#FFE8B7', '#FFBE87', '#E38A74', '#BF5967'],
    ['#507A4A', '#C0C480', '#FFEAA4', '#FFCDA4', '#FF938D'],
    ['#2A5A26', '#3E742F', '#568D3B', '#6DA850', '#89C15F'],
    ['#0B1C26', '#234459', '#7AA5BF', '#A0C3D9', '#BF7950'],
    ['#234D51', '#9DD3D9', '#59C6D1', '#3B4F51', '#FF513F'],
    ['#FF4858', '#1B7F79', '#00CCC0', '#72F2EB', '#747F7F'],
    ['#A6BF5B', '#E85C34', '#699748', '#2D411E', '#FF5A2B'],
];

const sketch = p => {

    // TODO: sometime make thing where when two red hit each other, they turn 
    // blue and when two blue hit each other they turn red

    // TODO: do ball sizes in relation to browser width and height. calculate
    const numBalls = 800;
    let j = [...Array(numBalls).keys()];
    let k;
    const ballDiameterInitial = 30;
    // let ballDiameter = 20;
    const diameterChange = 0.999;
    const spring = 30;
    const gravity = 0;
    const wallBounceReactionFactorInitial = -1;
    const balls = [];
    const backgoundColor = 230;
    const alpha = 200;
    const alphaBackground = 3
    const alphaHex = '11'
    const colorOne = colorSchemes[0][0] + alphaHex
    const colorTwo = colorSchemes[0][1] + alphaHex
    const colorThree = colorSchemes[0][2] + alphaHex
    // const colorOne = [150, 80, 80, alpha];
    // const colorTwo = [80, 150, 80, alpha];
    // const colorThree = [80, 80, 150, alpha];
    let ballStartColor = colorOne;
    // let ballColor = [180, 180, 180];
    let infectedOne = true;
    let infectedTwo = false;
    let infectedThree = false;

    // const recovered = false;
    let x = 0;
    let y = 0;
    let windowInnerWidth = window.innerWidth;
    let windowInnerHeight = window.innerHeight;
    let width = windowInnerWidth;
    console.log('width', width)
    let height = windowInnerHeight;
    // const spiralConstant = 2;
    // const infectedOneColor = [200, 0, 0];
    const speedThreshold = 4;

    const ballsPerRow = Math.ceil(Math.sqrt(numBalls));
    const rowScaleDenom = ballsPerRow + 1;
    const xSpacing = width / rowScaleDenom;

    const ballsPerCol = Math.ceil(Math.sqrt(numBalls));
    const colScaleDenom = ballsPerCol + 1;
    const ySpacing = height / colScaleDenom;
    const xCoords = [];
    const yCoords = [];
    // console.log('xSpacing', xSpacing)
    // console.log('ySpacing', ySpacing)
    // console.log('ballsPerRow', ballsPerRow)
    // console.log('ballsPerCol', ballsPerCol)

    for (let i = 0; i < ballsPerRow; i++) {
        // console.log(xCoords)

        for (let j = 0; j < ballsPerCol; j++) {
            yCoords.push(ySpacing * (j + 1));
            xCoords.push(xSpacing * (i + 1));
        }

    }
    // console.log('xCoords', xCoords)
    // console.log('yCoords', yCoords)




    p.setup = () => {
        p.frameRate(15);
        p.createCanvas(width, height);
        p.drawBackground();
        p.setupPosition();
        for (let i = 0; i < numBalls; i++) {
            // if (i >= Math.floor(1/3*numBalls)) {
            if (i % 3 === 1) {
                infectedOne = false;
                infectedTwo = true;
                infectedThree = false;
                ballStartColor = colorTwo;
            }
            // if (i >= Math.floor(2/3*numBalls)) {
            if (i % 3 === 2) {
                infectedOne = false;
                infectedTwo = false;
                infectedThree = true;
                ballStartColor = colorThree;
            }
            if (i % 3 === 0) {
                infectedOne = true;
                infectedTwo = false;
                infectedThree = false;
                ballStartColor = colorOne;
            }

            let ballDiameter = ballDiameterInitial
            // let ballDiameter = ballDiameterInitial + 10 * Math.random()


            balls[i] = new Ball(
                // spiralConstant * i * cos(1 * i) + width / 2,
                // spiralConstant * i * sin(1 * i) + height / 2,
                xCoords[i],
                yCoords[i],
                ballDiameter,
                i,
                balls,
                ballStartColor,
                overlap,
                infectedOne,
                infectedTwo,
                infectedThree
            );
        }
        // let i = numBalls - 1;
        // balls[i] = new Ball(
        //     // spiralConstant * i * cos(1 * i) + width / 2,
        //     // spiralConstant * i * sin(1 * i) + height / 2,
        //     xCoords[i],
        //     yCoords[i],
        //     ballDiameter,
        //     i,
        //     balls,
        //     infectedOneColor,
        //     overlap,
        //     true
        // );
        p.noStroke();

        // var minutesLabel = document.getElementById("minutes");
        // var secondsLabel = document.getElementById("seconds");
        // var totalSeconds = 0;
        // setInterval(setTime, 1000);

        // function setTime() {
        //     ++totalSeconds;
        //     secondsLabel.innerHTML = pad(totalSeconds % 60);
        //     minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        // }

        // function pad(val) {
        //     var valString = val + "";
        //     if (valString.length < 2) {
        //         return "0" + valString;
        //     } else {
        //         return valString;
        //     }
        // }
    };

    p.setupPosition = () => {
        x = p.windowWidth / 2;
        y = p.windowHeight / 2;
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.drawBackground();
        p.setupPosition();
    };

    p.drawBackground = () => {
        p.background([0, 0, 0, alphaBackground]);
    };

    p.draw = () => {

        const start = new Date()



        // console.log('p.frameCount', p.frameCount)
        // console.log('p.frameRate()', p.frameRate())
        if (p.frameCount % 3 === 0) {
            p.drawBackground()

        }
        balls.forEach(ball => {
            ball.collide();
            ball.move();
            ball.display();
        });

    };






    // function colorChange(ball) {
    //     if (JSON.stringify(ball.color) === JSON.stringify([255, 255, 0])) {
    //         return [50, 50, 0];
    //     } else {
    //         return [255, 255, 0];
    //     }
    // }

    function ballsCollided(ball) {

    }

    function refractory() {

    }

    function overlap() {

    }

    function endOverlap() {

    }






    class Ball {
        constructor(xin, yin, din, idin, oin, color, overlap, infectedOne, infectedTwo, infectedThree) {
            this.x = xin;
            this.y = yin;
            this.vx = p.random(-1, 1);
            this.vy = p.random(-1, 1);
            this.diameter = din;
            this.id = idin;
            this.others = oin;
            this.color = color;
            this.overlap = false;
            this.infectedOne = infectedOne;
            this.infectedTwo = infectedTwo;
            this.infectedThree = infectedThree;
        }

        collide() {
            // let startIndex = this.id;
            // console.log('frameCount', frameCount);
            // console.log('this.id', this.id);
            // console.log('this.id', this.id);
            let k = [];
            for (let l = 0; l < numBalls; l++) {
                k.push((this.id + l) % numBalls);
            }
            k = k.filter(el => el !== this.id)
            // console.log('k', k);
            let i;
            for (let m = 0; m < k.length; m++) {
                i = k[m];
                // console.log('i', i)


                let dx = this.others[i].x - this.x;
                let dy = this.others[i].y - this.y;
                let distance = p.sqrt(dx * dx + dy * dy);
                let minDist = this.others[i].diameter / 2 + this.diameter / 2;
                let overlapping = distance < minDist;
                if (overlapping) {
                    // this.infectedOne = true;
                    // this.others[i].infectedOne = true;
                    // let angle = Math.random();
                    // let angle = p.atan2(dy, dx) + Math.random()* 0.5 ;
                    let angle = p.atan2(dy, dx)
                    // console.log('angle', angle)
                    // console.log('angle', Math.round(angle * 180 / Math.PI))
                    let targetX = this.x + p.cos(angle) * minDist;
                    let targetY = this.y + p.sin(angle) * minDist;
                    let ax = (targetX - this.others[i].x) * spring;
                    let ay = (targetY - this.others[i].y) * spring;
                    this.vx -= ax;
                    this.vy -= ay;
                    this.others[i].vx += ax;
                    this.others[i].vy += ay;
                    // if (this.id ===0) {
                    //     console.log('this.vx',this.vx)

                    // }
                    if (this.vx > 0) {
                        this.vx = this.vx > speedThreshold ? speedThreshold : this.vx;
                    }
                    if (this.vx < 0) {
                        this.vx = this.vx < -speedThreshold ? -speedThreshold : this.vx;
                    }

                    if (this.vy > 0) {
                        this.vy = this.vy > speedThreshold ? speedThreshold : this.vy;
                    }
                    if (this.vy < 0) {
                        this.vy = this.vy < -speedThreshold ? -speedThreshold : this.vy;
                    }

                    if (this.others[i].vx > 0) {
                        this.others[i].vx = this.others[i].vx > speedThreshold ? speedThreshold : this.others[i].vx;
                    }
                    if (this.others[i].vx < 0) {
                        this.others[i].vx = this.others[i].vx < -speedThreshold ? -speedThreshold : this.others[i].vx;
                    }

                    if (this.others[i].vy > 0) {
                        this.others[i].vy = this.others[i].vy > speedThreshold ? speedThreshold : this.others[i].vy;
                    }
                    if (this.others[i].vy < 0) {
                        this.others[i].vy = this.others[i].vy < -speedThreshold ? -speedThreshold : this.others[i].vy;
                    }

                    // let plusOrMinus = Math.random() < 0.5 ? -1 : 1;


                    // console.log(`collision occured between ${this.id} and ${this.others[i].id}`, this)
                    if (this.infectedOne === true && this.others[i].infectedTwo === true) {
                        // console.log('one is infectedOne')

                        // this.color = colorOne;
                        const modifiedColorOne = colorOne
                        this.others[i].color = modifiedColorOne;
                        // this.others[i].color = colorOne;
                        this.diameter = this.diameter / diameterChange;
                        // this.overlap = true;
                        // this.others[i].overlap = true;
                        this.infectedOne = true;
                        this.others[i].infectedOne = true;
                        this.infectedTwo = false;
                        this.others[i].infectedTwo = false;
                        // this.infectedThree = false;
                        // this.others[i].infectedThree = false;
                    } else if (this.infectedTwo === true && this.others[i].infectedThree === true) {
                        // console.log('one is infectedTwo')
                        this.diameter = this.diameter * diameterChange;

                        // this.color = colorTwo;
                        this.others[i].color = colorTwo;
                        // this.overlap = true;
                        // this.others[i].overlap = true;
                        // this.infectedOne = false;
                        // this.others[i].infectedOne = false;
                        this.infectedTwo = true;
                        this.others[i].infectedTwo = true;
                        this.infectedThree = false;
                        this.others[i].infectedThree = false;
                    } else if (this.infectedThree === true && this.others[i].infectedOne === true) {
                        // console.log('one is infectedThree')


                        this.diameter = Math.random() < 0.5
                            ? this.diameter * diameterChange
                            : this.diameter / diameterChange;

                        // this.color = colorThree;
                        this.others[i].color = colorThree;
                        // this.overlap = true;
                        // this.others[i].overlap = true;
                        this.infectedOne = false;
                        this.others[i].infectedOne = false;
                        // this.infectedTwo = false;
                        // this.others[i].infectedTwo = false;
                        this.infectedThree = true;
                        this.others[i].infectedThree = true;
                    }
                    // else if (this.infectedOne === true && this.others[i].infectedThree === true) {
                    //     console.log('one is infectedThree')
                    //     this.color = colorThree;
                    //     // this.others[i].color = colorThree;
                    //     // this.overlap = true;
                    //     // this.others[i].overlap = true;
                    //     this.infectedOne = false;
                    //     this.others[i].infectedOne = false;
                    //     // this.infectedTwo = false;
                    //     // this.others[i].infectedTwo = false;
                    //     this.infectedThree = true;
                    //     this.others[i].infectedThree = true;
                    // }






                }
                // if (this.overlap === true && this.others[i].overlap === true && overlapping === false) {
                //     // this.color = [30,100,30];
                //     // this.others[i].color = colorChange(this.others[i]);
                //     // this.others[i].color = [30,100,30];
                //     this.color = [30,100,30];
                //     this.others[i].color = [30,100,30];
                //     this.overlap = false;
                //     this.others[i].overlap = false;
                //     this.infectedOne = true;
                //     this.others[i].infectedOne = true;
                //     // console.log('234')
                // }
                // console.log(i,this.infectedOne)

            }


        }

        move() {
            this.vy += gravity;
            this.x += this.vx / 2;
            this.y += this.vy / 2;
            // makes sure stays in bounds of canvas
            const wallBounceReactionFactor = wallBounceReactionFactorInitial
            // const wallBounceReactionFactor = wallBounceReactionFactorInitial * Math.random() + 0.5

            if (this.x + this.diameter / 2 > width) {
                this.x = width - this.diameter / 2;
                this.vx *= wallBounceReactionFactor;
            } else if (this.x - this.diameter / 2 < 0) {
                this.x = this.diameter / 2;
                this.vx *= wallBounceReactionFactor;
            }
            if (this.y + this.diameter / 2 > height) {
                this.y = height - this.diameter / 2;
                this.vy *= wallBounceReactionFactor;
            } else if (this.y - this.diameter / 2 < 0) {
                this.y = this.diameter / 2;
                this.vy *= wallBounceReactionFactor;
            }
        }

        display() {

            p.fill(this.color);
            // p.fill('#E8614F');
            // p.stroke(0,0,0,88)
            // console.log(this.color[0])
            p.ellipse(this.x, this.y, this.diameter, this.diameter);

        }
    }







};








export default sketch









