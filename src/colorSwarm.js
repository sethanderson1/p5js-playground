// color swarm - when balls touch they change color 
// ball1 changes ball2's color
// ball2 changes ball3's color
// ball3 changes ball1's color


const sketch = (p) => {


    let width = window.innerWidth;
    let height = window.innerHeight;

    let isIncreasing

    let colorVal = 0;

    p.setup = () => {
        p.createCanvas(width, height * 0.992);
        p.frameRate(6)
    }

    p.draw = () => {
        p.background(200);

        var space = 50; // x spacing
        var hexWidth = 30;
        const colLength = Math.ceil(width / space);
        let hexColorOne = [200, 0, 0]
        let hexColorTwo = [0, 200, 0]

        let randColor;
        let colorUpperLimit = 200;
        let colorLowerLimit = 0



        if (colorVal === colorUpperLimit-1) {
            isIncreasing = false
        } else if (colorVal === colorLowerLimit) {
            isIncreasing = true
        }
        // console.log('isIncreasing', isIncreasing)
 
        if (isIncreasing) {
            colorVal = p.frameCount % colorUpperLimit

        } else {
            colorVal = colorUpperLimit- p.frameCount % colorUpperLimit-1
        }




        for (var y = 0; y < colLength; y++) {
            var py = y * space * p.sqrt(3) / 2; // y position
            for (var x = 0; x < colLength; x++) {
                randColor = [p.random(colorVal),p.random(colorVal),p.random(colorVal)]
                // console.log('randColor', randColor)

                if (y % 2 === 0) {
                    hexagon(x * space, py, hexWidth, hexWidth, randColor);
                    // console.log('x', x)
                } else {
                    hexagon(space / 2 + x * space, py, hexWidth, hexWidth, randColor);
                }
            }
        }
    }

    function hexagon(x, y, radius, ...color) {
        // console.log('color', color)
        p.fill(...color[1]);
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









