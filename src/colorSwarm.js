

// todo: make a version with smoothed noise function, ie not totally random
const sketch = (p) => {

    let width = window.innerWidth;
    let height = window.innerHeight;
    const hex = [];

    p.setup = () => {
        p.createCanvas(width, height * 0.993);
        p.frameRate(30)
        p.initHex()
    }

    p.initHex = async () => {
        let space = 300; // x spacing
        let hexWidth = 173;
        let colLength = Math.ceil(width / space);
        let id = 0;
        let upperBound = 255;
        let lowerBound = 230;
        for (let y = 0; y < colLength; y++) {
            let py = y * space * p.sqrt(3) / 2; // y position
            for (let x = 0; x < colLength+1; x++) {
                let color = p.random(lowerBound, upperBound);
                if (y % 2 === 0) {
                    hex[id] = new Hex(id, x * space, py, hexWidth,
                        color, upperBound, lowerBound);
                    hex[id].makeHexagon();
                } else {
                    hex[id] = new Hex(id, space / 2 + x * space, py,
                        hexWidth, color, upperBound, lowerBound);
                    hex[id].makeHexagon();
                }
                id++;
                console.log('id', id)
            }
        }
    }

    p.draw = () => {
        p.background(255);
        hex.forEach((h) => {
            h.incrementColor()
            h.makeHexagon()
        })
    }

    class Hex {
        constructor(id, x, y, radius, color, upperBound, lowerBound) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.isIncreasing = Math.random() > 0.5 ? true : false;
            this.upperBound = upperBound;
            this.lowerBound = lowerBound;
        }



        incrementColor() {

            if (this.color > this.lowerBound && this.color < this.upperBound) {
                if (Math.random() > 0.8) {
                    if (this.isIncreasing) {
                        this.color++;
                    } else {
                        this.color--;
                    }
                }
            }

            if (this.color >= this.upperBound) {
                this.color--;
                this.isIncreasing = false;
            }
            if (this.color <= this.lowerBound) {
                this.color++;
                this.isIncreasing = true;
            }
        }

        makeHexagon() {
            p.fill(this.color,this.color,this.color,255);
            p.noStroke();
            p.angleMode(p.DEGREES);
            p.beginShape();
            for (let a = 30; a < 390; a += 60) {
                let sx = this.x + p.cos(a) * this.radius;
                let sy = this.y + p.sin(a) * this.radius;
                p.vertex(sx, sy);
            }
            p.endShape(p.CLOSE);
        }

        display() {

        }
    }
}


export default sketch









