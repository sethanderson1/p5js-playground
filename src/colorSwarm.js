// color swarm - when balls touch they change color 
// ball1 changes ball2's color
// ball2 changes ball3's color
// ball3 changes ball1's color

const sketch = (p) => {

    let width = window.innerWidth;
    let height = window.innerHeight;

    p.setup = () => {
        p.createCanvas(width,height*0.992);
    }

        p.draw = () => {
        p.background(0,0,0);

        var space = 50; // x spacing
        var w = 28;
        const colLength = 50;

        for (var y = 0; y < colLength; y++) {
            var py = y * space * p.sqrt(3) / 2; // y position
            for (var x = 0; x < colLength; x++) {
                if (y % 2 === 0) hexagon(x * space, py, w, w);
                else hexagon(space / 2 + x * space, py, w, w);
            }
        }
    }

    function hexagon(x, y, radius) {
        p.fill(100,100,100);
        p.noStroke();
        p.angleMode(p.DEGREES);
        p.beginShape();
        for (let a = 30; a < 390; a += 60) {
            let sx = x + p.cos(a) * radius;
            let sy = y + p.sin(a) * radius;
            p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
    }

}





export default sketch









