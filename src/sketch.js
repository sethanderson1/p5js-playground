// rectangles sliding up and down left and right

const sketch = (p) => {
    // an array to add multiple bars
    const bars = [];
    let barCount = 600;
    let alpha = '99';
    let directionOptions = ['horizontal']
    // let directionOptions = ['horizontal','vertical']

    let xLeftWall = -1500;
    let xRightWall = 1000;
    let yBottomWall = -2200;
    let yTopWall = 2200;

    let barLengthUpperBound = 1200;
    let barLengthLowerBound = 500;
    let barWidth = 50;
    let barLength = p.random(barLengthLowerBound, barLengthUpperBound);
    // let barLength = 1000;
    // let maxBarWidth = 200;
    // let maxBarHeight = 200;
    let xVelLowerBound = 0.5;
    let xVelUpperBound = 3;
    let yVelLowerBound = 0.5;
    let yVelUpperBound = 3;

    let xSlotCount = p.windowWidth / barWidth;
    // console.log('xSlotCount', xSlotCount)
    let ySlotCount = p.windowHeight / barWidth;
    // console.log('ySlotCount', ySlotCount)


    p.setup = () => {
        // p.frameRate(1);
        for (let i = 0; i < barCount; i++) {
            bars[i] = new Bar();
        }
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(options.BackgroundColor);
    }

    p.draw = () => {
        p.background(options.BackgroundColor);
        for (let i = 0; i < bars.length; i++) {
            bars[i].move();
            bars[i].display();
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
            this.xPos = p.random(xSlots(xSlotCount));
            this.yPos = p.random(ySlots(ySlotCount));
            this.xVel = p.random(xVelLowerBound, xVelUpperBound);
            this.yVel = p.random(yVelLowerBound, yVelUpperBound);
            this.direction = p.random(directionOptions);
            this.color = p.random([
                options.BarColors.color1 + alpha,
                options.BarColors.color2 + alpha,
                options.BarColors.color3 + alpha,
                options.BarColors.color4 + alpha,
                options.BarColors.color5 + alpha,
            ]);
            this.barWidth = barWidth;
        }



        // setting the bar in motion.
        move() {
            if (this.direction === 'horizontal') {
                if (this.xPos < xLeftWall || this.xPos > p.windowWidth + xRightWall) {
                    this.xVel *= -1;
                }
                this.xPos += this.xVel;
            } else {
                if (this.yPos < yBottomWall || this.yPos > p.windowHeight + yTopWall) {
                    this.yVel *= -1;
                }
                this.yPos += this.yVel;
            }
        }

        display() {
            p.noStroke();
            p.smooth();
            p.fill(this.color);
            // this.barWidth += p.random([-0.1, 0.1]);
            if (this.direction === 'horizontal') {
                p.rect(this.xPos, this.yPos, barLength, this.barWidth);
            } else {
                p.rect(this.xPos, this.yPos, barWidth, barLength);
            }
        }
    }

}



export default sketch;





const options = {
    BarColors: {
        color1: '#4a4e4d',
        color2: '#0e9aa7',
        color3: '#3da4ab',
        color4: '#f6cd61',
        color5: '#fe8a71',
    },
    BackgroundColor: '#fff',
}

