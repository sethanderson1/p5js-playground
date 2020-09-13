
import p5 from 'p5'


export default class Ball {
    constructor(xin, yin, din, idin, oin, color,
        overlap, infectedOne, infectedTwo, infectedThree) {
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
                let angle = p.atan2(dy, dx);
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
                    this.others[i].color = colorOne;
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

        p.fill(this.color);
        // console.log(this.color[0])
        p.ellipse(this.x, this.y, this.diameter, this.diameter);

    }
}

