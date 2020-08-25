const sketch = p => {
    let x = 0;
    let y = 0;
    let mouse
    let dot
    let dotToMouseDirection

    let windowInnerWidth = window.innerWidth;
    let windowInnerHeight = window.innerHeight;
    let width = windowInnerWidth;
    let height = windowInnerHeight;



    p.setup = () => {
        p.createCanvas(width, height);
        p.drawBackground();
        p.setupPosition();
        p.frameRate(10);
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
        p.background(0);
    };

    p.draw = () => {
        p.fill(255, 255, 0, 10);
        p.noStroke();
        p.ellipse(x, y, 48, 48);

        let limitLeft = 10;
        let limitRight = 10;
        let limitUp = 10;
        let limitDown = 10;

        // if mouse is in certain position
        // relative to dot, increase limit
        // in those directions OR decrease 
        // limits for opposite directions

        // also maybe do dot gets bigger and smaller
        // according to timing function and 
        // changes in color and other ways

        // also do gets faster towards mouse as 
        // gets closer

        let mouseX = p.mouseX;
        let mouseY = p.mouseY;
        mouse = p.createVector(mouseX, mouseY);

        mouse.sub(dot);
        mouse.normalize();
        // console.log('mouse', mouse)


        // make more random
        limitLeft = -limitLeft * mouse.x;
        limitRight = limitRight * mouse.x;
        limitUp = -limitUp * mouse.y;
        limitDown = limitDown * mouse.y;


        x = x + p.random(-limitLeft, limitRight);
        y = y + p.random(-limitUp, limitDown);
        dot = p.createVector(x, y);


    };
};

export default sketch