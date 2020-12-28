// rectangles sliding up and down left and right

const sketch = (p) => {
    //////////////////////////////////////////////////////////////////////////
    //                       //                                             //
    //   -~=Manoylov AC=~-   //           Semi Circle Patchwork             //
    //                       //                                             //
    //////////////////////////////////////////////////////////////////////////
    //                                                                      //
    // Controls:                                                            //
    //    mouse                                                             //
    //      click: generate new patchwork                                   //
    //                                                                      //
    //    keyboard                                                          //
    //       's': save image                                                //
    //       '1': modeFn - semiDual                                         //
    //       '2': modeFn - shark                                            //
    //       '3': modeFn - oneSemi                                          //
    //       '4': modeFn - mess                                             //
    //       '5': modeFn - rotateSemi                                       //
    //       '6': modeFn - pear                                             //
    //       '7': modeFn - chain                                            //
    //////////////////////////////////////////////////////////////////////////
    //                                                                      //
    // Contacts:                                                            //
    //    http://manoylov.tumblr.com/                                       //
    //    https://codepen.io/Manoylov/                                      //
    //    https://www.openprocessing.org/user/23616/                        //
    //    https://www.facebook.com/epistolariy                              //
    //////////////////////////////////////////////////////////////////////////

    let height = p.windowHeight;
    let width = p.windowWidth;
    var blockSize = 200;
    var countBorder = 4;
    var wdt = blockSize * countBorder;
    var hgt = blockSize * countBorder;
    var modes = [semiDual, shark, oneSemi, mess, rotateSemi, pear, chain];
    var currModeFn = semiDual;
    var colorSchemes = [
        ['#E8614F', '#F3F2DB', '#79C3A7', '#668065', '#4B3331'],
        ['#152A3B', '#158ca7', '#F5C03E', '#D63826', '#F5F5EB'],
        ['#0F4155', '#288791', '#7ec873', '#F04132', '#fcf068'],
        // ['#152A3B', '#0D809C', '#F5C03E', '#D63826', '#EBEBD6', '#152A3B'],
        // ['#0F4155', '#5399A1', '#8CA96B', '#CB5548', '#E7E6F5', '#0F4155'],
        // ['#E8614F', '#F3F2DB', '#79C3A7', '#668065', '#4B3331', '#E8614F'],
        // ['#DBE5EC', '#336B87', '#2A3132', '#E94D35', '#EFAC55', '#DBE5EC'],
        // ['#8A867F', '#FFE8B7', '#FFBE87', '#E38A74', '#BF5967', '#8A867F'],
        // ['#507A4A', '#C0C480', '#FFEAA4', '#FFCDA4', '#FF938D', '#507A4A'],
        // ['#234D51', '#9DD3D9', '#59C6D1', '#3B4F51', '#FF513F', '#234D51'],
        // ['#FF4858', '#1B7F79', '#00CCC0', '#72F2EB', '#747F7F', '#FF4858'],
        // ['#2A5A26', '#3E742F', '#568D3B', '#6DA850', '#89C15F', '#2A5A26'],
        // ['#0B1C26', '#234459', '#7AA5BF', '#A0C3D9', '#BF7950', '#0B1C26'],
        // ['#A6BF5B', '#E85C34', '#699748', '#2D411E', '#FF5A2B', '#A6BF5B'],
    ];
    var queueNum = [0, 1, 2, 3, 4];
    var clrs = colorSchemes[0];

    p.setup = () => {
        p.createCanvas(wdt, hgt);
        p.rectMode('CENTER');
        p.noStroke();
        p.noLoop();
    }

    p.draw = () => {
        p.background(25);
        for (var y = blockSize / 2; y < height; y += blockSize) {
            for (var x = blockSize / 2; x < width; x += blockSize) {
                queueNum = shuffleArray([0, 1, 2, 3, 4]);
                p.fill(clrs[queueNum[0]]);
                p.rect(x, y, blockSize, blockSize);

                p.push();
                p.translate(x, y);
                currModeFn(0, 0, clrs);
                p.pop();
            }
        }
        paper();
    }

    function chain(x, y, clrs) {
        p.rotate(p.radians(90 * Math.round(p.random(1, 5))));
        p.fill(clrs[queueNum[1]]);
        p.arc(x - blockSize / 2, y, blockSize, blockSize, p.radians(270), p.radians(450));
        p.fill(clrs[queueNum[2]]);
        p.arc(x + blockSize / 2, y, blockSize, blockSize, p.radians(90), p.radians(270));

        p.rotate(p.radians(90 * Math.round(p.random(1, 5))));
        p.fill(clrs[queueNum[1]]);
        p.arc(x, y + blockSize / 2, blockSize, blockSize, p.radians(180), p.radians(360));
        p.fill(clrs[queueNum[2]]);
        p.arc(x, y - blockSize / 2, blockSize, blockSize, p.radians(0), p.radians(180));
    }

    function pear(x, y, clrs) {
        p.rotate(p.radians(90 * Math.round(p.random(1, 5))));

        p.fill(clrs[queueNum[1]]);
        p.arc(x - blockSize / 2, y, blockSize, blockSize, p.radians(270), p.radians(450));
        p.fill(clrs[queueNum[2]]);
        p.arc(x + blockSize / 2, y, blockSize, blockSize, p.radians(90), p.radians(270));

        p.fill(clrs[queueNum[1]]);
        p.arc(x, y + blockSize / 2, blockSize, blockSize, p.radians(180), p.radians(360));
        p.fill(clrs[queueNum[2]]);
        p.arc(x, y - blockSize / 2, blockSize, blockSize, p.radians(0), p.radians(180));
    }

    function rotateSemi(x, y, clrs) {
        p.rotate(p.radians(90 * Math.round(p.random(1, 5))));
        p.fill(clrs[queueNum[1]]);
        p.arc(-blockSize / 2, 0, blockSize, blockSize, p.radians(270), p.radians(450));
    }

    function mess(x, y, clrs) {
        p.fill(clrs[queueNum[Math.floor(p.random(queueNum.length))]]);
        p.arc(-blockSize / 2, 0, blockSize, blockSize, p.radians(270), p.radians(450));
        for (var i = 0; i < 3; i++) {
            p.fill(clrs[queueNum[Math.floor(p.random(queueNum.length))]]);
            p.rotate(p.radians(90 * Math.round(p.random(1, 5))));
            p.arc(x, y + blockSize / 2, blockSize, blockSize, p.radians(270), p.radians(450));
        }
    }

    function oneSemi(x, y, clrs) {
        if (p.random(1) > .2) {
            p.fill(clrs[queueNum[Math.floor(p.random(queueNum.length))]]);
            p.arc(x - blockSize / 2, y, blockSize, blockSize, p.radians(270), p.radians(450));
        }
    }

    function shark(x, y, clrs) {
        if (p.random(1) > .4) {
            p.fill(clrs[queueNum[Math.floor(p.random(queueNum.length))]]);
            p.arc(x, y + blockSize / 2, blockSize, blockSize, p.radians(270), p.radians(450));
        }
    }

    function semiDual(x, y, clrs) {
        p.rotate(p.radians(90 * Math.round(p.random(1, 5))));
        if (p.random() > .005) {
            p.fill(clrs[queueNum[1]]);
            p.arc(x - blockSize / 2, y, blockSize, blockSize, p.radians(270), p.radians(450));
            p.fill(clrs[queueNum[2]]);
            p.arc(x + blockSize / 2, y, blockSize, blockSize, p.radians(90), p.radians(270));
        }
    }

    function shuffleArray(array) {
        var j, temp;
        for (var i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    function resetPatchwork(modeFn) {
        currModeFn = modeFn || modes[Math.floor(p.random(modes.length))];
        clrs = colorSchemes[Math.floor(p.random(colorSchemes.length))];
        p.redraw();
    }

    p.mousePressed = () => {
        resetPatchwork();
    }

    p.keyPressed = (e) => {
        switch (e.key.toLowerCase()) {
            case '1': resetPatchwork(semiDual); break;
            case '2': resetPatchwork(shark); break;
            case '3': resetPatchwork(oneSemi); break;
            case '4': resetPatchwork(mess); break;
            case '5': resetPatchwork(rotateSemi); break;
            case '6': resetPatchwork(pear); break;
            case '7': resetPatchwork(chain); break;
            case 's': p.save('img_' + ~~p.random(100, 900) + '.jpg'); break;
            default: resetPatchwork(); break;
        }
    }

    function paper() {
        p.push();
        p.strokeWeight(1);
        p.noStroke();
        const grainSize = p.random([2])
        for (var i = 0; i < width - 1; i += grainSize) {
            for (var j = 0; j < height - 1; j += grainSize) {
                p.fill(p.random(205 - 40, 205 + 30), 25);
                // p.fill(p.random(205 - 40, 205 + 30), 25);
                p.rect(i, j, grainSize, grainSize);
            }
        }

        for (var i = 0; i < 30; i++) {
            p.fill(p.random(130, 215), p.random(100, 170));
            p.rect(p.random(0, width - 2), p.random(0, height - 2), p.random(1, 3), p.random(1, 3));
        }

        p.pop();
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

