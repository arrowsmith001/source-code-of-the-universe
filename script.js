
const c = { val: 299792458, unit: "m/s" };
const h = { val: 6.62607015, unit: "x 10^34 J·s" };
const g = { val: 6.67430, unit: "x 10^11 m³/kg/s²" };
const e = { val: 1.602176634, unit: "x 10^-19 C" };
const k = { val: 1.380649, unit: "x 10^-23 J/K" };
const av = { val: 6.02214076, unit: "x 10^23 particles/mole" };


const canvas = document.getElementById('codeCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

var cSlider = document.getElementById("cSlider");
var hSlider = document.getElementById("hSlider");
var gSlider = document.getElementById("gSlider");
var eSlider = document.getElementById("eSlider");
var kSlider = document.getElementById("kSlider");
var aSlider = document.getElementById("aSlider");


var cInput = document.getElementById("c");
var hInput = document.getElementById("h");
var gInput = document.getElementById("G");
var eInput = document.getElementById("e");
var kInput = document.getElementById("k");
var aInput = document.getElementById("av");

var cUnit = document.getElementById("cUnit");
var hUnit = document.getElementById("hUnit");
var gUnit = document.getElementById("gUnit");
var eUnit = document.getElementById("eUnit");
var kUnit = document.getElementById("kUnit");
var aUnit = document.getElementById("aUnit");

cUnit.innerHTML = c.unit;
hUnit.innerHTML = h.unit;
gUnit.innerHTML = g.unit;
eUnit.innerHTML = e.unit;
kUnit.innerHTML = k.unit;
aUnit.innerHTML = av.unit;


cSlider.min = 0;
cSlider.max = c.val * 2;
cSlider.value = c.val;

hSlider.step = 0.01;
hSlider.min = 0;
hSlider.max = h.val * 2;
hSlider.value = h.val;

gSlider.step = 0.01;
gSlider.min = 0;
gSlider.max = g.val * 2;
gSlider.value = g.val;

eSlider.step = 0.01;
eSlider.min = 0;
eSlider.max = e.val * 2;
eSlider.value = e.val;

kSlider.step = 0.01;
kSlider.min = 0;
kSlider.max = k.val * 2;
kSlider.value = k.val;

aSlider.step = 0.01;
aSlider.min = 0;
aSlider.max = av.val * 2;
aSlider.value = av.val;


cInput.value = c.val;
hInput.value = h.val;
gInput.value = g.val;
eInput.value = e.val;
kInput.value = k.val;
aInput.value = av.val;


cSlider.oninput = function () {

    cInput.value = this.value;
    const v = parseFloat(this.value);

    var vNorm = v / parseFloat(c.val);
    if (vNorm > 1) {
        vNorm **= 5;
    }

    maxSpeed = vNorm * baseSpeed;
    minSpeed = maxSpeed / maxSpeedToMin;

    updateSpeed();
}

hSlider.oninput = function () {

    hInput.value = this.value;
    const v = parseFloat(this.value);

    var vNorm = v / parseFloat(h.val);
    if (vNorm > 1) {
        vNorm **= 5;
    }
    digitSpacing = vNorm;

    updateSpacing();
}

gSlider.oninput = function () {

    gInput.value = this.value;
    const v = parseFloat(this.value);

    var vNorm = (v / parseFloat(g.val)) - 1;
    // if (vNorm > 1) {
    //     vNorm **= 5;
    // }

    gravity = vNorm;
}

eSlider.oninput = function () {

    eInput.value = this.value;
    const v = parseFloat(this.value);
    var vNorm = (v / parseFloat(e.val)) - 1;
    // if (vNorm > 1) {
    //     vNorm **= 5;
    // }

    eCharge = vNorm;
}

kSlider.oninput = function () {

    kInput.value = this.value;
    const v = parseFloat(this.value);
    var vNorm = (v / parseFloat(k.val)) - 1;
    if (vNorm > 1) {
        vNorm **= 3;
    }

    brownianMagnitude = vNorm * baseBrownianMagnitude;

}

aSlider.oninput = function () {

    aInput.value = this.value;
    const v = parseFloat(this.value);
    var vNorm = (v / parseFloat(av.val));
    if (vNorm > 1) {
        vNorm **= 2;
    }

    const n = Math.ceil(vNorm * baseNumStrings);
    const current = binaryStrings.length;

    if (n == current) {

    }
    else if (n < current) {
        binaryStrings = [];
        for (let i = 0; i < n; i++) {
            const bs = addBinaryString();
            binaryStrings.push(bs);
        }

    } else {
        const diff = n - current;
        for (let i = 0; i < diff; i++) {
            const bs = addBinaryString();
            binaryStrings.push(bs);
        }
    }


}

function updateSpeed() {
    for (let i = 0; i < binaryStrings.length; i++) {
        binaryStrings[i].updateSpeed = true;
    }
}

function updateSpacing() {

    for (let i = 0; i < binaryStrings.length; i++) {
        binaryStrings[i].updateSpace = true;
    }
}


const baseNumStrings = 150.0;
const baseSpeed = 10;
const maxSpeedToMin = 8;
const M = { x: canvas.width / 2, y: canvas.height };
const gravityForce = 8;
const baseBrownianMagnitude = 50;

var brownianMagnitude = 1;
var maxSpeed = baseSpeed;
var minSpeed = baseSpeed / maxSpeedToMin;
var digitSpacing = 1.0;
var gravity = 0;
var eCharge = 0;

const maxStringLength = 30;
const minBrightness = 50;
const maxBrightness = 255;
const minDigitSize = 12;
const maxDigitSize = 36;



var binaryStrings = [];

for (let i = 0; i < baseNumStrings; i++) {

    const bs = addBinaryString();
    binaryStrings.push(bs);
}

function addBinaryString() {
    const x = Math.random() * canvas.width;
    const r = Math.random();

    const stringLength = Math.floor(Math.random() * maxStringLength) + 1;

    const brightness = map(r, 0, 1, maxBrightness, minBrightness);
    const speed = map(r, 0, 1, maxSpeed, minSpeed);
    const size = map(r, 0, 1, maxDigitSize, minDigitSize);

    const digits = generateRandomBinaryString(stringLength, size, x);

    return {
        x, digits, brightness, speed, size, r, s: Math.random(),
        updateSpeed: false, updateSpace: false, updateGravity: false,
    };

}


function generateBinaryStrings() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    for (let i = 0; i < binaryStrings.length; i++) {

        const { x, digits, brightness, speed, size, r, s, updateSpeed, updateSpace, updateGravity } = binaryStrings[i];

        if (updateSpeed) {
            binaryStrings[i].speed = map(r, 0, 1, maxSpeed, minSpeed);
            binaryStrings[i].updateSpeed = false;
        }

        if (updateSpace) {
            const digits = binaryStrings[i].digits;

            if (digits.length != 0) {

                var heighest = digits[0].y;

                for (var j = 0; j < binaryStrings[i].digits.length; j++) {
                    const newHeight = heighest + (j * digitSpacing * size);
                    binaryStrings[i].digits[j].y = newHeight;
                }
                binaryStrings[i].updateSpace = false;

            }

        }

        //ctx.fillText(JSON.stringify(binaryStrings[i]), 0, 100);

        for (let j = 0; j < digits.length; j++) {
            let digit = digits[j];

            const dx = M.x - digit.x;
            const dy = M.y - digit.y;
            const d = Math.sqrt(dx ** 2 + dy ** 2);
            const ndx = dx / d;
            const ndy = dy / d;

            digit.x += gravity * gravityForce * ndx;


            digit.y += speed + (gravity * ndy);
            if (digit.y > canvas.height) {
                digits.splice(j, 1);
            }

        }







        ctx.font = `${size}px monospace`;

        for (let j = 0; j < digits.length; j++) {
            const d = digits[j];

            if (eCharge < 0) {

                const blu = Math.floor(Math.abs(Math.sin((d.y * d.x) / 1000)) * -eCharge * 255);
                ctx.fillStyle = `rgb(${0}, ${brightness}, ${blu})`;
            }
            else {
                const red = Math.floor(Math.abs(Math.sin(d.y)) * eCharge * 255);
                ctx.fillStyle = `rgb(${red}, ${brightness}, ${0})`;
            }

            if (brownianMagnitude > 0) {

                var rdx = Math.random() * brownianMagnitude;
                var rdy = Math.random() * brownianMagnitude;
            }
            else {
                // var ds = 1 - Math.abs(d.s);
                // var rdx = ds * brownianMagnitude;
                // s += ds;

                // var rdy = 0;
                const freq = 0.1;
                var derivative = (2 * Math.PI * freq) * Math.cos(2 * Math.PI * freq * d.y * 0.1);

                d.s += derivative * 0.1;
                // d.s = Math.max(-1, Math.min(1, d.s));

                var rdx = brownianMagnitude * 5 * d.s;
                var rdy = 0;
            }

            ctx.fillText(d.digit, d.x + rdx, d.y + rdy);
        }


        if (digits.length == 0) {
            binaryStrings[i] = addBinaryString();
        }

    }



    requestAnimationFrame(generateBinaryStrings);
}

function generateRandomBinaryString(length, size, x) {
    let binaryString = [];
    for (let i = 0; i < length; i++) {
        var digit = Math.random() < 0.5 ? '0' : '1';
        binaryString.push({ digit: digit, x: x, y: -i * digitSpacing * size, s: Math.random() });
    }
    return binaryString;
}

function map(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

generateBinaryStrings();


function log(s) {
    var logger = document.getElementById('log');
    logger.innerHTML += s + ' ';

};


