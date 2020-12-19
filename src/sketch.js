// perlin flow field trails

const sketch = (p) => {

    const particles = [];
    let maxLife;
    let backgroundColor;


    let type;
    const options = {
        Background: '#0a0a0a',
        Color1: '#ffffff',
        Color2: '#0799f2',
        Color3: '#45217c',
        Length: 10,
        // Length: 10,
        Nums: 50,
        Size: 2,
        noiseScale: 800,
        ColorMode: 'Normal',
        Random: function () {
            const Length = p.random(1, 50);
            LengthControl.setValue(Length);

            const Nums = p.random(200, 1000);
            NumsControl.setValue(Nums);

            const noiseScale = p.random(200, 4000);
            noiseControl.setValue(noiseScale);

            const Size = p.random(1, 4);
            SizeControl.setValue(Size);

            const Cmode = p.random(['Normal', 'Linera Gradient', 'Splice']);
            ColorControl.setValue(Cmode);

            p.setup();
        },

        Save: function () {
            p.saveFrames("Perlin-Noise", "png", 1, 1);
        },
    }


    var text, gui, config, bgcolorControl, color1Control, color2Control, noiseControl, LengthControl, NumsControl, SaveControl, RandomControl, SaveControl, SizeControl, ColorControl;


    p.setup = () => {
        // p.frameRate(10);
        backgroundColor = p.color(options.Background);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(options.Background);
        p.noiseSeed(99);

        for (let i = 0; i < options.Nums; i++) {
        // for (let i = 0; i < 2500; i++) {
            particles[i] = new Particle();
        }


    };


    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.drawBackground();
        // p.setupPosition();
    };

    p.drawBackground = () => {
        p.background(0);
    };

    p.draw = () => {
        // console.log('p.frameCount', p.frameCount)
        p.noStroke();
        p.smooth();

        maxLife = options.Length;
        for (let i = 1; i < options.Nums; i++) {
            let iterations = p.map(i, 0, options.Nums, 5, 1);
            let radius = options.Size;

            particles[i].move(iterations);
            particles[i].checkEdge();

            let alpha = 255;
            let particleColor;
            let fadeRatio;
            fadeRatio = p.min(particles[i].life * 5 / maxLife, 1);
            fadeRatio = p.min((maxLife - particles[i].life) * 5 / maxLife, fadeRatio);
            // fadeRatio = fadeRatio/10;
            // fadeRatio = p.min(particles[i].life * 5 / maxLife, 1);
            // fadeRatio = p.min((maxLife - particles[i].life) * 5 / maxLife, fadeRatio);
            let lifeRatioGrayscale = p.min(255, (255 * particles[i].life / maxLife) + p.red(backgroundColor));
            if (options.ColorMode === 'Normal') {
                if (i % 3 === 0) particleColor = options.Color1;
                if (i % 3 === 1) particleColor = options.Color2;
                if (i % 3 === 2) particleColor = options.Color3;
            }

            if (options.ColorMode === 'Linera Gradient') {
                let percent1 = p.norm(particles[i].pos.x, 0, p.width / 2);
                let percent2 = p.norm(particles[i].pos.x, p.width / 2, p.width);
                let from = p.color(options.Color1);
                let middle = p.color(options.Color2);
                let to = p.color(options.Color3);
                let between1 = p.lerpColor(from, middle, percent1);
                let between2 = p.lerpColor(middle, to, percent2);
                if (particles[i].pos.x > 0 && particles[i].pos.x < p.width / 2) {
                    particleColor = between1;
                } else {
                    particleColor = between2;
                }
            }

            if (options.ColorMode === 'Radial Gradient') {
                let distance = p.dist(particles[i].pos.x, particles[i].pos.y, p.width / 2, p.height / 2);
                let percent1 = p.norm(distance, 0, 400);
                let percent2 = p.norm(distance, 400, p.width / 2);
                let from = p.color(options.Color1);
                let middle = p.color(options.Color2);
                let to = p.color(options.Color3);
                let between1 = p.lerpColor(from, middle, percent1);
                let between2 = p.lerpColor(middle, to, percent2);
                if (distance < 400) {
                    particleColor = between1;
                } else {
                    particleColor = between2;
                }
            }

            if (options.ColorMode === 'Splice') {
                if (particles[i].pos.x >= p.width / 3 && particles[i].pos.x <= p.width / 3 * 2) {
                    if (i % 3 === 0) particleColor = options.Color1;
                    if (i % 3 === 1) particleColor = options.Color2;
                    if (i % 3 === 2) particleColor = options.Color3;
                } else if (particles[i].pos.x < p.width / 3) {
                    if (i % 3 === 0) particleColor = 20;
                    if (i % 3 === 1) particleColor = 100;
                    if (i % 3 === 2) particleColor = 220;
                } else if (particles[i].pos.x > p.width / 3 * 2) {
                    if (i % 3 === 0) particleColor = p.color(255 - p.red(options.Color1), 255 - p.green(options.Color1), 255 - p.blue(options.Color1));
                    if (i % 3 === 1) particleColor = p.color(255 - p.red(options.Color2), 255 - p.green(options.Color2), 255 - p.blue(options.Color2));
                    if (i % 3 === 2) particleColor = p.color(255 - p.red(options.Color3), 255 - p.green(options.Color3), 255 - p.blue(options.Color3));
                }
            }

            p.fill(p.red(particleColor), p.green(particleColor), p.blue(particleColor), alpha * fadeRatio);
            particles[i].display(radius);
        }


    };



    function Particle() {

        this.z = 100;
        this.vel = p.createVector(0, 0);
        this.pos = p.createVector(p.random(-50, p.width + 50), p.random(-50, p.height + 50));
        this.life = p.random(0, maxLife);
        this.move = function (iterations) {
            if ((this.life -= 0.01666) < 0)
                this.respawn();
            while (iterations > 0) {



                // // gradually increments z
                // if (p.frameCount % 10 === 0) {
                //     this.z = this.z + 0.0001;
                //     // console.log('this.z', this.z)
                // }
                this.z += 0.000001;


                let angle = p.noise(this.pos.x / options.noiseScale, this.pos.y / options.noiseScale, this.z) * p.TWO_PI * options.noiseScale;
                this.vel.x = p.cos(angle);
                this.vel.y = p.sin(angle);
                this.vel.mult(0.2);
                this.pos.add(this.vel);
                --iterations;
            }
        }

        this.checkEdge = function () {
            if (this.pos.x > p.width || this.pos.x < 0 || this.pos.y > p.height || this.pos.y < 0) {
                this.respawn();
            }
        }

        this.respawn = function () {
            this.pos.x = p.random(-50, p.width + 50);
            this.pos.y = p.random(-50, p.height + 50);
            this.life = maxLife;
        }

        this.display = function (r) {
            p.ellipse(this.pos.x, this.pos.y, r, r);
        }
    }

    function touchStarted() {
        p.background(options.Background);
        for (let i = 0; i < options.Nums; i++) {
            particles[i].respawn();
            particles[i].life = p.random(0, maxLife);
        }
    }


}

export default sketch;









