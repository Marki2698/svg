//import * as builder from "./builder";
let paper = Snap('#test1');
// let's make brain

//getting width and height of document and set our coords BEGIN
let height = document.documentElement.clientHeight || document.body.clientHeight;
let width = document.documentElement.clientWidth || document.body.clientWidth;
let correctWidth = 0.3 * width;
let correctHeight = 0.25 * height;
// coords of the border of the brain
let OutBrainCoords = [
    [0, 140],
    [80, 60],
    [200, 10],
    [300, 0],
    [400, 20],
    [480, 80],
    [530, 160],
    [540, 240],
    [500, 290],
    [440, 300],
    [420, 340],
    [360, 360],
    [300, 340],
    [350, 440],
    [300, 435],
    [230, 330],
    [150, 320],
    [80, 260],
    [10, 210]
];
let baseInnerCoords = [
    [
        [45, 130],
        [95, 140],
        [180, 185],
        [160, 105],
        [250, 50]
    ],
    [
        [60, 230],
        [140, 210],
        [210, 225],
        [250, 170],
        [270, 300]
    ],
    [
        [340, 270],
        [425, 260],
        [490, 150],
        [400, 190],
        [350, 170]
    ],
    [
        [240, 120],
        [285, 115],
        [320, 70],
        [370, 40],
        [390, 110]
    ]
];

let array_lines = [];

for (let i = 0; i < OutBrainCoords.length; i++) {
    OutBrainCoords[i][0] += correctWidth;
    OutBrainCoords[i][1] += correctHeight;
}

// END

//filling our sky by stars BEGIN
let randomStarsCounter = 1;
let randomStarsInterval = setInterval(() => {
    let x = Math.floor(Math.random() * (width - 5) + 1);
    let y = Math.floor(Math.random() * (height - 5) + 1);
    if (x > OutBrainCoords[0][0] - 5 && x < OutBrainCoords[7][0] + 5 && y > OutBrainCoords[3][1] - 5 && y < OutBrainCoords[13][1] + 5) {;
    } else {
        let other = paper.circle(x, y, 3);
        //let f = paper.filter(Snap.filter.shadow(0, 0, "#ffffff", 1));
        let f = paper.filter(Snap.filter.blur(.5, .5));
        other.attr({
            filter: f
        });
        other.animate({
            fill: "#fff"

        }, 100);
    }
    ++randomStarsCounter;
    if (randomStarsCounter == 100) {
        clearInterval(randomStarsInterval);
        BuildBrain();
    }
}, 10);


// END