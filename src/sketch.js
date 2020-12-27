// rectangles sliding up and down

const sketch = (p) => {

    // an array to add multiple bars
    const bars = [];
    p.setup = () => {
        // p.frameRate(1);
        for (let i = 0; i < 100; i++) {
            bars[i] = new Bar();
        }
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background('#fff');
    }

    p.draw = () => {
        p.background('#fff');
        for (let i = 0; i < bars.length; i++) {
            bars[i].createBar();
            bars[i].moveBar();
        }
        // console.log('bars', bars)
    }

    const options = {
        Colors: {
            color1: '#4a4e4daa',
            color2: '#0e9aa7aa',
            color3: '#3da4abaa',
            color4: '#f6cd61aa',
            color5: '#fe8a71aa',
        }
    }
    class Bar {
        constructor() {
            this.xPos = p.random(0, p.windowWidth);
            this.yPos = p.random(0, p.windowHeight);
            this.xVel = p.random(1, 12);
            this.yVel = p.random(1, 12);
            this.direction = p.random(-1, 1) > 0 ? 'horizontal' : 'vertical';
            this.color = p.random([
                options.Colors.color1,
                options.Colors.color2,
                options.Colors.color3,
                options.Colors.color4,
                options.Colors.color5,
            ]);
        }

        createBar() {
            p.noStroke();
            p.smooth();
            p.fill(this.color);
            if (this.direction === 'horizontal') {
                p.rect(this.xPos, this.yPos, 1000, 80);
            } else {
                p.rect(this.xPos, this.yPos, 80, 1000);
            }
        }

        // setting the bar in motion.
        moveBar() {
            if (this.direction === 'horizontal') {
                if (this.xPos < -1400 || this.xPos > p.windowWidth + 1400) {
                    this.xVel *= -1;
                }
                this.xPos += this.xVel;
            } else {
                if (this.yPos < -1400 || this.yPos > p.windowHeight + 1400) {
                    this.yVel *= -1;
                }
                this.yPos += this.yVel;
            }
        }
    }

}


export default sketch;






