const sketch = p => {
    let x = 0;
    let y = 0;
    let windowInnerWidth = window.innerWidth;
    let width = windowInnerWidth/2;
    let windowInnerHeight = window.innerHeight;
    let height = windowInnerHeight/2;
    p.setup = () => {
        p.createCanvas(width, height);
        p.drawBackground();
        p.setupPosition();
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
        // p.color = 
        p.background(0,0,0,88);
    };

    p.draw = () => {
        p.fill(255, 255, 0, 25);
        p.noStroke();
        p.ellipse(x, y, 48, 48);

        x = x + p.random(-10, 10);
        y = y + p.random(-10, 10);
    };
};

export default sketch