// rectangles sliding up and down

const sketch = (p) => {

    // an array to add multiple bars
    let backgroundColor;
    const bars = [];
    p.setup() {
        // p.frameRate(1);
        for (let i = 0; i < 10; i++) {
            bars[i] = new Bar();
        }

        backgroundColor = p.color(options.Background);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(options.Background);
    }

    p.draw() {
        p.background('#000000');
        for (let i = 0; i < bars.length; i++) {
            bars[i].createBar();
            bars[i].moveBar();
        }
    }


    class Bar {
        constructor() {
            this.xPos = p.random(0, p.width);
            this.yPos = p.random(0, p.height);
            this.xVel = p.random(-2, 2);
            this.yVel = p.random(-2, 2);
            this.direction = p.random(-1, 1) > 0 ? 'horizontal' : 'vertical';
        }

        createBar() {
            p.noStroke();
            p.smooth();
            p.fill('rgba(200,169,169,0.5)');
            p.rect(this.x, this.y, 20, 20);
        }

        // setting the bar in motion.
        moveBar() {
            if (this.direction === 'horizontal') {
                if (this.xPos < 0 || this.xPos > p.width) {
                    this.xVel *= -1;
                }
                this.xPos += this.xVel;
            } else {
                if (this.yPos < 0 || this.yPos > p.height) {
                    this.yVel *= -1;
                }
                this.yPos += this.yVel;
            }
        }
    }


    // const options = {
    //     Background: '#0a0a0a',
    //     Color1: '#ffffff',
    //     Color2: '#0799f2',
    //     Color3: '#0a0a0a',
    //     // Color3: '#45217c',
    //     Length: 10,
    //     // Length: 10,
    //     Nums: 50,
    //     Size: 2,
    //     noiseScale: 800,
    //     ColorMode: 'Normal',
    //     Random: function () {
    //         const Length = p.random(1, 50);
    //         LengthControl.setValue(Length);

    //         const Nums = p.random(200, 1000);
    //         NumsControl.setValue(Nums);

    //         const noiseScale = p.random(200, 4000);
    //         noiseControl.setValue(noiseScale);

    //         const Size = p.random(1, 4);
    //         SizeControl.setValue(Size);

    //         const Cmode = p.random(['Normal', 'Linera Gradient', 'Splice']);
    //         ColorControl.setValue(Cmode);

    //         p.setup();
    //     },

    //     Save: function () {
    //         p.saveFrames("Perlin-Noise", "png", 1, 1);
    //     },
    // }


    // p.windowResized = () => {
    //     p.resizeCanvas(p.windowWidth, p.windowHeight);
    //     p.drawBackground();
    //     // p.setupPosition();
    // };

    // p.drawBackground = () => {
    //     p.background(0);
    // };



    // this.checkEdge = function () {
    //     if (this.pos.x > p.width || this.pos.x < 0 || this.pos.y > p.height || this.pos.y < 0) {
    //         this.respawn();
    //     }
    // }

    // this.respawn = function () {
    //     this.pos.x = p.random(-50, p.width + 50);
    //     this.pos.y = p.random(-50, p.height + 50);
    //     this.life = maxLife;
    // }

    // this.display = function (r) {
    //     p.ellipse(this.pos.x, this.pos.y, r, r);
    // }
}


export default sketch;






