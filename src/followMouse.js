// dot follows mouse in a jittery way, painting the canvas
// good for making cloud like patterns?
const sketch = p => {
    let x = 0;
    let y = 0;
    let mouse
    let dot
    let dotToMouseDirection

    let windowInnerWidth = window.innerWidth;
    let windowInnerHeight = window.innerHeight;
    let width = windowInnerWidth;
    console.log('width', width)
    let height = windowInnerHeight;



    p.setup = () => {
        p.createCanvas(width, height);
        p.drawBackground();
        p.setupPosition();
        // p.frameRate(10);
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

        let alpha = 1;
        let ellipseWidth = p.windowHeight / 20;

        let limitLeft = 50;
        let limitRight = 50;
        let limitUp = 50;
        let limitDown = 50;

        // if mouse is in certain position
        // relative to dot, increase limit
        // in those directions OR decrease 
        // limits for opposite directions

        // also maybe do dot gets bigger and smaller
        // according to timing function and 
        // changes in color and other ways

        // also do gets faster towards mouse as 
        // gets closer

        let limitLeftCoef = 1
        let limitRightCoef = 1
        let limitUpCoef = 1
        let limitDownCoef = 1
        let mouseX = p.mouseX;
        let mouseY = p.mouseY;
        mouse = p.createVector(mouseX, mouseY);

        mouse.sub(dot);
        mouse.normalize();

        function sign(val) {
            return val < 0 ? -1 : 1;
        }

        // make more random
        limitLeft = -limitLeft * sign(mouse.x);
        limitRight = limitRight * sign(mouse.x);
        limitUp = -limitUp * sign(mouse.y);
        limitDown = limitDown * sign(mouse.y);

        // console.log('mouse.x', mouse.x)
        // console.log('mouse.y', mouse.y)
        // console.log('limitLeft', limitLeft)
        // console.log('limitRight', limitRight)

        limitLeftCoef = mouse.x > 0 ? 0.1 : 1;
        limitRightCoef = mouse.x <= 0 ? 0.1 : 1;
        limitUpCoef = mouse.y > 0 ? 0.1 : 1;
        limitDownCoef = mouse.y <= 0 ? 0.1 : 1;


        x = x + p.random( -limitLeftCoef * Math.abs(limitLeft), limitRightCoef * Math.abs(limitRight));
        // console.log('limitLeftCoef', limitLeftCoef,'limitRightCoef', limitRightCoef)
        // console.log('p.random( -limitLeftCoef * Math.abs(limitLeft), limitLeftCoef * Math.abs(limitRight))', p.random( -limitLeftCoef * Math.abs(limitLeft), limitLeftCoef * Math.abs(limitRight)))
        y = y + p.random( -limitUpCoef * Math.abs(limitUp), limitDownCoef * Math.abs(limitDown));
        dot = p.createVector(x, y);

        p.fill(255, 255, 255, alpha);
        p.noStroke();
        p.ellipse(x, y, ellipseWidth, ellipseWidth);


    };
};

export default sketch