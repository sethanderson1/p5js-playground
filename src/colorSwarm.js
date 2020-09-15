

const sketch = (p) => {

    let width = window.innerWidth;
    let height = window.innerHeight;
    const hex = [];

    p.setup = () => {
        p.createCanvas(width, height * 0.992);
        // p.frameRate(10)
        p.initHex()
    }

    p.initHex = async () => {
        let space = 50; // x spacing
        let hexWidth = 30;
        let colLength = Math.ceil(width / space);
        let id = 0;
        for (let y = 0; y < colLength; y++) {
            let py = y * space * p.sqrt(3) / 2; // y position
            for (let x = 0; x < colLength; x++) {
                let shadeVal = Math.floor(Math.random() * 255);
                // console.log('shadeVal', shadeVal)
                if (y % 2 === 0) {
                    hex[id] = new Hex(id, x * space, py, hexWidth, shadeVal)
                    hex[id].makeHexagon()
                } else {
                    hex[id] = new Hex(id, space / 2 + x * space, py, hexWidth, shadeVal)
                    hex[id].makeHexagon()
                }
                // console.log('hex[id]', hex[id])
                id++;
            }
        }
    }

    p.draw = () => {
        p.background(200);
        hex.forEach((h) => {
            h.incrementColor()
            h.makeHexagon()
        })
    }

    class Hex {
        constructor(id, x, y, radius, color) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.isIncreasing = Math.random() > 0.5 ? true : false;
        }



        incrementColor() {

            let upperBound = 255;
            let lowerBound = 0;

            if (this.color > lowerBound && this.color < upperBound) {
                if (this.isIncreasing) {
                    this.color++
                    // this.isIncreasing = false;
                } else {
                    this.color--
                    // this.isIncreasing = true;
                }
            }

            if (this.color === upperBound) {
                this.color--
                this.isIncreasing = false
            }
            if (this.color === lowerBound) {
                this.color++
                this.isIncreasing = true
            }

        }

        makeHexagon() {
            p.fill(this.color);
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









