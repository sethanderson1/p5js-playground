// rectangles sliding up and down

const sketch = (p) => {

    // an array to add multiple bars
    const bars = [];
    p.setup = () => {
        // p.frameRate(1);
        for (let i = 0; i < 300; i++) {
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
    }

    const options = {
        Colors: {
            color1: '#4a4e4d33',
            color2: '#0e9aa733',
            color3: '#3da4ab33',
            color4: '#f6cd6133',
            color5: '#fe8a7133',
        }
    }

    const xSlots = (numSlots) => {
        const slots = [];
        for (let i = 0; i < numSlots; i++) {

            slots.push(p.windowWidth * i / numSlots)
        }
        return slots;
    }
    const ySlots = (numSlots) => {
        const slots = [];
        for (let i = 0; i < numSlots; i++) {

            slots.push(p.windowHeight * i / numSlots)
        }
        return slots;
    }
    class Bar {
        constructor() {
            // this.xPos = p.random(0, p.windowWidth);
            // this.yPos = p.random(0, p.windowHeight);
            this.xPos = p.random(xSlots(8));
            this.yPos = p.random(ySlots(6));
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
                p.rect(this.xPos, this.yPos, 1500, 130);
            } else {
                p.rect(this.xPos, this.yPos, 130, 1500);
            }
        }

        // setting the bar in motion.
        moveBar() {
            if (this.direction === 'horizontal') {
                if (this.xPos < -2200 || this.xPos > p.windowWidth + 2200) {
                    this.xVel *= -1;
                }
                this.xPos += this.xVel;
            } else {
                if (this.yPos < -2200 || this.yPos > p.windowHeight + 2200) {
                    this.yVel *= -1;
                }
                this.yPos += this.yVel;
            }
        }
    }

}


export default sketch;






