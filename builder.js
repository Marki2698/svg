// builder functions
let brainOutPoints = new Map();
let brainInPoints = new Map();

function BuildBrain() {
    let brainCircleCounter = 0;
    let j = 0;
    let brainCircleInterval = setInterval(() => {
        if (brainCircleCounter == OutBrainCoords.length) {
            clearInterval(brainCircleInterval);
            BuildInPoints();
        } else {
            let cirlce_i = paper.circle(OutBrainCoords[brainCircleCounter][0], OutBrainCoords[brainCircleCounter][1], 0);
            let f = paper.filter(Snap.filter.blur(.5, .5));
            cirlce_i.attr({
                id: "Outcircle_" + brainCircleCounter + "",
                fill: "#fff",
                filter: f
            });
            cirlce_i.animate({
                r: 3
            }, 100);
            brainOutPoints.set("circle_" + j, cirlce_i);
            brainCircleCounter++;
            j++;
        }
    }, 100);
}

function BuildInPoints() {
    let innerCounter = 0;
    let ID = 0;
    let subCounter = 0;
    let i = 0;
    let j = 0;
    let counter = 0;
    let interval = setInterval(() => {
        if (i != baseInnerCoords.length) {
            let innerCircle = paper.circle(baseInnerCoords[i][j][0] + correctWidth, baseInnerCoords[i][j][1] + correctHeight, 0);
            let key = "innerCircle_" + i + "_" + j;
            let f = paper.filter(Snap.filter.blur(.5, .5));
            innerCircle.attr({
                id: key,
                fill: "#fff",
                filter: f
            });
            innerCircle.animate({
                r: 3
            }, 100);
            brainInPoints.set(key, innerCircle);
        } else {
            clearInterval(interval);
            let timeout = setTimeout(() => {
                BuildBrainOutLines();
                clearTimeout(timeout);
            }, 1500);
            return false;
        }
        if (j == baseInnerCoords.length) {
            i++;
            j = 0;
        } else {
            j++;
            counter++;
        }
    }, 50);
}

function BuildBrainOutLines() {
    let linesCounter = 0;
    let j = 0;
    let z = 1;
    let linesInterval = setInterval(() => {
        if (linesCounter == OutBrainCoords.length - 1) {
            let beginCircle = brainOutPoints.get("circle_" + (OutBrainCoords.length - 1));
            let endCircle = brainOutPoints.get("circle_0");
            beginCircle.addClass("Outline_" + (OutBrainCoords.length - 1));
            endCircle.addClass("Outline_" + (OutBrainCoords.length - 1));
            DrawLines(beginCircle, endCircle, "outLine_", linesCounter);
            clearInterval(linesInterval);
            let timeout = setTimeout(() => {
                BuildBrainInLines(brainInPoints);
                clearTimeout(timeout);
            }, 500);
        } else {
            let beginCircle = brainOutPoints.get("circle_" + j);
            let endCircle = brainOutPoints.get("circle_" + z);
            beginCircle.addClass("Outline_" + linesCounter);
            endCircle.addClass("Outline_" + linesCounter);
            DrawLines(beginCircle, endCircle, "outLine_", linesCounter);
            linesCounter++;
            j++;
            z++;
            if (linesCounter == OutBrainCoords.length) clearInterval(linesInterval);
        }
    }, 100)
}

function BuildBrainInLines(map) {
    let counter = 0;
    let i = 0;
    let j = 0;
    let interval = setInterval(() => {
        if (i == baseInnerCoords.length) {
            clearInterval(interval);
            ZoomBrain(brainOutPoints, brainInPoints);
            return false;
        } else {
            let beginKey = "innerCircle_" + i + "_" + j;
            let endKey = "innerCircle_" + i + "_" + (j + 1);
            let begin = map.get(beginKey);
            let end = map.get(endKey);
            begin.addClass("innerLine_" + i + "_" + j);
            end.addClass("innerLine_" + i + "_" + (j + 1));
            DrawLines(begin, end, "innerLine_", counter);
            if (j == 3) {
                i++;
                j = 0;
            } else {
                j++;
                counter++;
            }
        }
    }, 100);
}

function DrawLines(begin, end, id, i) {
    let x1 = +begin.attr().cx;
    let y1 = +begin.attr().cy;
    let x2 = +end.attr().cx;
    let y2 = +end.attr().cy;
    let line_i = paper.line(x1, y1, x1, y1);
    line_i.attr({
        id: id + i + "",
        strokeWidth: 1
    });
    line_i.animate({
        x2: x2,
        y2: y2,
        stroke: "#fff"
    }, 250);
    array_lines.push(line_i);
    begin.use(begin);
    end.use(end);
}

function ZoomBrain(...rest) {
    let array_group = [];
    let f = paper.filter(Snap.filter.blur(0, 0));
    for (let i = 0; i < rest.length; i++) {
        rest[i].forEach((value, i, map) => {
            array_group.push(value);
        });
    }
    let elem = array_group[0];
    let counter = 0;
    let interval = setInterval(() => {
        if (counter == array_group.length) {
            // call function which will show "cerebro" label
            clearInterval(interval);
            ShowLabel("cerebro");
            return false;
        } else {
            array_group[counter].animate({
                fill: "#fff",
                r: 5
            }, 100);
            if (counter < array_lines.length) {
                array_lines[counter].animate({
                    strokeWidth: 2
                }, 100);
            }
            counter++;
        }
    }, 100);
}

function ShowLabel(label) {
    let x = 0.25 * width;
    let y = 0.6 * height;
    let timing = 750;
    let f = paper.filter(Snap.filter.blur(50, 50));
    //let f = paper.filter(Snap.filter.shadow(0, 0, 150, "#fff", 1));
    let rect = paper.rect(0, 0, width, height);
    rect.attr({
        fill: "#000",
        opacity: 0
    });
    let parent = document.querySelector(".parent");
    let div = document.createElement('div');
    div.className = "wrapper";
    parent.appendChild(div);
    $(div).css({
        "width": width,
        "height": height
    });
    $(div).animate({
        "opacity": 0.8
    }, 1000, () => {
        let p = document.createElement("p");
        p.className = "BlurLabel";
        p.innerHTML = label;
        let parentLabel = document.querySelector(".wrapper"); // or .parent
        parentLabel.appendChild(p);
        $(p).animate({
            opacity: 1
        }, 1000);
        console.log("finished");
    });
}

//export { BuildBrain };