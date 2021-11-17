alert("Welcome to Carnival!");
let themeClrs = [
  "Crimson",
  "OrangeRed",
  "DarkOrange",
  "PeachPuff",
  "Gold",
  "HotPink",
  "DeepPink",
  "MediumVioletRed",
  "PaleGoldenRod",
  "DarkViolet",
];
let themeClr = themeClrs[0];
let clrIndex = 0;
let fireworks = [];
let explosions = [];
let houses = [];

function setup(){
  let canvas = createCanvas(0.95*windowWidth, 0.95*windowHeight);
  canvas.id("p5-canvas");
  noCursor();
    frameRate(90);
    thelauncher = new Launcher();
    drawHouses(50, 50);
    sliderR=document.getElementById('bg-r');
      sliderG=document.getElementById('bg-g');
        sliderB=document.getElementById('bg-b');
}
function draw(){
  background(sliderR.value, sliderG.value, sliderB.value);
    drawMoon();
    showParameters(20);
    CrowdControl(5, floor((width * height) / 80000)); //(fireworksLimit/explosionsLimit)
    for (let i = 0; i <= houses.length - 1; i++) {
      let h = houses[i];
      h.display();
    } //display all houses
    for (let i = 0; i <= fireworks.length - 1; i++) {
      let f = fireworks[i];
      f.smoke();
      f.display();
      f.launch();
      f.countdown();
    } //display all existing fireworks
    thelauncher.display();
    for (let i = 0; i <= fireworks.length - 1; i++) {
      let f = fireworks[i];
      if (f.isDone == true) {
        explosions.push(new Explosion(f.x, f.y, f.color, f.scale)); //BOOOOOM
        for (let i = 0; i <= houses.length - 1; i++) {
          let h = houses[i];
          if (abs(h.x - f.x) <= 135 * f.scale) {
            h.roofClr = f.color;
          }
        } //check what houses should be colored
        fireworks.splice(i, 1); //firework disappear after sending out parameters
      }
    } //implications of explosion
    for (let i = 0; i <= explosions.length - 1; i++) {
      let e = explosions[i];
      e.display();
    } //display all existing explosions
}
class Firework {
  constructor(startX, startY, color, upSpd) {
    this.x = startX;
    this.y = startY;
    this.color = color;
    this.upSpd = upSpd;
    this.isDone = false;
    this.fuse = random(height / 15, (height * 2) / 3);
    this.wiggle = 0;
    this.wigglevar = 1 + random(-0.25, 0.25);
    this.scale = random(0.5, 1.5);
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    this.wiggle = 0.2 * this.wigglevar * sin(0.1 * this.wigglevar * frameCount);
    rotate(this.wiggle);
    fill(this.color);
    triangle(-20, 0, +20, 0, 0, -20);
    quad(-10, 0, 10, 0, 10, 25, -10, 25);
    pop();
  }
  launch() {
    this.y = this.y - this.upSpd;
  }
  smoke() {
    push();
    noStroke();
    for (let i = 0; i < 3; i++) {
      fill(random(255), random(255), random(255), 200);
      circle(
        this.x + random(-10 * this.scale, 10 * this.scale),
        this.y + 30 + random(0, height - this.y - 30),
        5
      );
    }
    for (let i = 0; i < 10; i++) {
      fill(128, 200);
      circle(
        this.x + random(-10 * this.scale, 10 * this.scale),
        this.y + 30 * this.scale + random(0, height - this.y - 50),
        5
      );
    }
    pop();
  }
  countdown() {
    if (this.y < this.fuse) {
      this.isDone = true;
    }
  }
} //object1
class Explosion {
  constructor(x, y, color, scale) {
    this.x = x;
    this.y = y;
    this.dia = (50 * scale) ^ 2;
    this.mainClr = color;
    this.subClrs = [];
    for (let i = 0; i < 16; i++) {
      this.subClrs.push(random(themeClrs));
    }
    this.types = ["line", "spark"];
    this.type = random(this.types);
  }
  display() {
    push();
    translate(this.x, this.y);
    if (this.type == "line") {
      fill(this.mainClr);
      strokeWeight(0);
      circle(0, 0, this.dia);
      for (let i = 0; i < 16; i++) {
        strokeWeight(0.1 * this.dia);
        stroke(this.subClrs[i]);
        rotate((i * PI) / 8);
        line(0, 0.7 * this.dia, 0, 2 * this.dia);
      }
    } else if (this.type == "spark") {
      for (let j = this.dia; j <= 1.5 * this.dia; j += 0.2 * this.dia) {
        rotate(PI / 32);
        for (let i = 0; i < 32; i++) {
          noStroke();
          fill(this.mainClr);
          rotate((i * PI) / 16);
          circle(0, j, this.dia / 10);
        }
      }
      for (let k = 1.6 * this.dia; k <= 2 * this.dia; k += 0.2 * this.dia) {
        rotate(PI / 32);
        for (let i = 0; i < 32; i++) {
          noStroke();
          fill(this.subClrs[floor(i / 2)]);
          rotate((i * PI) / 16);
          circle(0, k, this.dia / 10);
        }
      }
    }
    pop();
  }
  fade() {}
} //object2
class Launcher {
  constructor() {}
  display() {
    push();
    fill(themeClr);
    quad(
      mouseX - 20,
      height - 30,
      mouseX + 20,
      height - 30,
      mouseX + 20,
      height,
      mouseX - 20,
      height
    );
    ellipse(mouseX, height - 30, 40, 10);
    pop();
  }
} //object3
class House {
  constructor(x, w, h, roofClr) {
    this.roofClr = roofClr;
    this.w = w;
    this.h = h;
    this.x = x;
  }
  display() {
    push();
    rectMode(CENTER);
    translate(this.x, height - 0.5 * this.h);
    fill("BurlyWood");
    rect(0, 0, this.w, this.h);

    quad(
      0.25 * this.w,
      -0.5 * this.h,
      0.4 * this.w,
      -0.5 * this.h,
      0.4 * this.w,
      -this.h,
      0.25 * this.w,
      -this.h
    );
    quad(
      0.45 * this.w,
      -this.h,
      0.2 * this.w,
      -this.h,
      0.2 * this.w,
      -1.1 * this.h,
      0.45 * this.w,
      -1.1 * this.h
    );
    fill(this.roofClr);
    triangle(
      -0.7 * this.w,
      -0.5 * this.h,
      0.7 * this.w,
      -0.5 * this.h,
      0,
      -this.h
    );
    fill(231, 254, 255);
    rect(0, 0, 0.5 * this.w, 0.5 * this.h);
    line(-0.25 * this.w, 0, 0.25 * this.w, 0);
    line(0, -0.25 * this.h, 0, 0.25 * this.h);
    pop();
  }
} //object4

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    if (clrIndex < themeClrs.length - 1) {
      clrIndex += 1;
    } else if (clrIndex == themeClrs.length - 1) {
      clrIndex = 0;
    }
  } else if (keyCode == LEFT_ARROW) {
    if (clrIndex > 0) {
      clrIndex -= 1;
    } else if (clrIndex == 0) {
      clrIndex = themeClrs.length - 1;
    }
  } else if (key == "r") {
    clrIndex = floor(random(0.01, themeClrs.length - 0.01));
  } else if (key == "f") {
    fireworks.splice(0, fireworks.length);
  } else if (key == "b") {
    explosions.splice(0, explosions.length);
  } else if (key == "h") {
    for (let i = 0; i <= houses.length - 1; i++) {
      let h = houses[i];
      h.roofClr = "BurlyWood";
    }
  }else if (key==" ") {
    fireworks.push(new Firework(mouseX, height - 50, themeClr, random(3, 5)));
  }
  themeClr = themeClrs[clrIndex];
} //cycle or randomize themeClr
function showParameters(size) {
  if (keyIsPressed && key == "p") {
    push();
    textSize(size);
    fill(themeClr);
    text("Theme Color: " + themeClr, 0, size);
    fill(230);
    text("Firework Count: " + fireworks.length, 0, 2 * size);
    text("Firework Patterns: " + explosions.length, 0, 3 * size);
    fill(128, 200);
    text("move the mouse to position the launcher", 0, 4 * size);
    text("press Space to launch", 0, 5 * size);
    text("press ← and → to cycle through colors", 0, 6 * size);
    text("press R to randomize color", 0, 7 * size);
    text("press F to remove fireworks", 0, 8 * size);
    text("press B to clear background", 0, 9 * size);
    text("press H to repaint houses", 0, 10 * size);
    pop();
  }
} //show parameters in the top-left corner
function drawHouses(w, h) {
  for (let x = w; x <= width - w; x = x + 1.8 * w) {
    houses.push(new House(x, w, h, "BurlyWood"));
  }
} //draw many houses to cover the bottom of the canvas
function drawMoon() {
  push();
  noStroke();
  fill(244, 241, 201);
  circle(0.85 * width, 0.2 * height, 0.25 * height);
  pop();
}
function CrowdControl(frwkLim, explLim) {
  if (fireworks.length > frwkLim) {
    fireworks.splice(fireworks.length - 1, 1);
  }
  if (explosions.length > explLim) {
    explosions.splice(0, 1);
  }
}
