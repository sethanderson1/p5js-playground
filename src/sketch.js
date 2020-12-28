// rectangles sliding up and down left and right

const sketch = (p) => {
    let flower = [];
    let bg;
    let COLS = ['#F3F2DB', '#E8614F', '#79C3A7', '#4B3331', '#668065'];
    // let COLS = createCols("https://coolors.co/fed167-f5f2ea-a29fbc-5f6591-f3453f-e02f10-c32f18");
    let SCOL = COLS.shift();
    let s = p.min(p.windowWidth, p.windowHeight) * 0.8;
    let width = s;
    let height = s;
    // let width = s;
    // let height = s;

    p.setup = () => {
        p.frameRate(22);
        // p.frameRate(1);
        // p.createCanvas(2000,2000);
        p.createCanvas(s, s);
        let c = 0;
        let r = p.min(width, height);
        while (r > 0) {
            let f = new SpreadFlower(r, c % 2 === 0);
            flower.push(f);
            console.log('flower', flower)
            c++;
            r -= 30;
        }

        bg = p.createGraphics(width, height);
        bg.noStroke();
        bg.fill(0, 8);
        for (let i = 0; i < 500000; i++) {
            let x = p.random(width);
            let y = p.random(height);
            let s = p.noise(x * 0.01, y * 0.01) * 1 + 1;
            bg.rect(x, y, s, s);
        }
        // paper function might be better
    }

    p.draw = () => {
        if (p.frameCount < 222222) {

            p.background(100);
            p.push();
            p.translate(width / 2, height / 2);
            p.rotate(p.frameCount / 150);
            for (const f of flower) {
                f.update();
                f.display();
            }
            p.pop();
            if (flower[1].isFullSize()) {
                flower.shift();
                let useRotateOffset = !flower[flower.length - 1].useRotateOffset;
                flower.push(new SpreadFlower(1, useRotateOffset));
            }
            // p.push();
            // p.rotate(p.frameCount / 100);

            p.image(bg, 0, 0);
            // p.pop();
        }

    }


    class SpreadFlower {
        constructor(radius, useRotateOffset) {
            this.sw = 5;
            this.petalNum = 15;
            this.radius = radius;
            this.useRotateOffset = useRotateOffset;
            this.cols = [];
            let colNum = p.random() > 0.6 ? 1 : this.petalNum;
            for (let i = 0; i < colNum; i++)this.cols.push(p.random(COLS));
            this.centerCol = p.random(COLS);
        }

        update() {
            const ns = 0.002;
            // const ns = -999999;
            // this.radius += p.random([1,1,1,1,2,2,3]);
            this.radius += 1 + p.noise(this.radius + p.frameCount * ns, (p.frameCount + 100) * ns) * 5;
        }

        display() {
            drawFlower(0, 0, this.radius, this.sw, this.petalNum, this.useRotateOffset, this.cols, this.centerCol);
        }

        isFullSize() {
            if (this.radius > p.max(width, height)) return true;
            return false;
        }

    }

    function drawFlower(x, y, radius, sw, petalNum, rotateOffset, cols, centerCol) {
        if (radius < sw * p.PI) {
            return;
        }
        const radSpan = p.TAU / petalNum;
        const r = p.HALF_PI - radSpan / 2;
        if (r >= p.HALF_PI) return;

        const circleRadius = radius * p.cos(r);
        let xOff = p.cos(radSpan / 2) * circleRadius;
        let yOff = p.sin(radSpan / 2) * circleRadius * -1;
        let radOff = rotateOffset === true ? radSpan / 2 : 0;
        for (let i = 0; i < petalNum; i++) {
            p.push();
            p.translate(x, y);
            p.rotate(i * radSpan + radOff);
            for (let c = 0; c < 2; c++) {
                let mult = c === 1 ? (circleRadius - sw / 2) / circleRadius : (circleRadius + sw / 2) / circleRadius;
                let centerY = radius - radius * mult;
                p.noStroke();
                if (c === 0) p.fill(SCOL);
                else p.fill(cols[i % cols.length]);
                p.circle(0, radius, circleRadius * 2 * mult);
                p.beginShape();
                p.vertex(0, centerY);
                p.vertex(xOff * mult, radius + yOff * mult);
                p.vertex(-xOff * mult, radius + yOff * mult);
                p.endShape();
            }
            p.pop();
            p.stroke(SCOL);
            p.fill(centerCol);
            p.strokeWeight(sw);
            p.circle(x, y, sw * p.TAU);
        }
    }

    // function createCols(_url) {
    //     let slash_index = _url.lastIndexOf('/');
    //     let pallate_str = _url.slice(slash_index + 1);
    //     let arr = pallate_str.split('-');
    //     for (let i = 0; i < arr.length; i++) {
    //         arr[i] = '#' + arr[i];
    //     }
    //     return arr;
    // }
}



export default sketch;