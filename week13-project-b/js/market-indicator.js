let banks = ["Your", "Alpha", "Bravo", "Charlie", "Delta"];
let capital = [];
let MOT; //Money Out There, not in posession by banks
let totalDebt = 0,
  totalWealth = 0;
let creditProblem = false;
let bankWealth = 0;

function setup() {
  let canvas=createCanvas(320, 200);
  canvas.id('market-indicator');
  bankStartup();
  initialFunding();
}

function draw() {
  background(255);
  showMarketStatus(20);
  wealthCalculation();
  if (MOT <= 20 && creditProblem == false) {
    issueBonds();
  }
  if (totalWealth < totalDebt && creditProblem == false) {
    crisis();
  }
}

function bankStartup() {
  banks[0] = prompt(
    'Please Name Your Investment Bank (enter "xxx" for xxxBank)',
    "Phil"
  );
}
function initialFunding(initialCapital) {
  initialCapital = prompt(
    "How much capital (in Millions) would like to start with? (10-30)",
    "20"
  );
  if (initialCapital < 10 || initialCapital > 30) {
    initialCapital = prompt(
      "How much capital (in Millions) would like to start with? (10-30)",
      "20"
    );
  }
  for (i = 0; i < banks.length; i++) {
    capital.push(initialCapital);
  }
  MOT = 6 * initialCapital;
}
function wealthCalculation() {
  bankWealth = 0;
  for (i = 0; i < capital.length; i++) {
    bankWealth += 1 * capital[i];
  }
  totalWealth = MOT * 1 + bankWealth * 1;
}
function showMarketStatus(size) {
  textSize(size);
  text("Market Situation:", 0, size);
  text("Money Out There: $ " + MOT + " Million", 0, 2 * size);
  for (i = 0; i < banks.length; i++) {
    text(banks[i] + "Bank: $ " + capital[i] + " Million", 0, (i + 3) * size);
  }
  text("total debt" + totalDebt, 0, 8 * size);
  text("total wealth" + totalWealth, 0, 9 * size);
}
function issueBonds() {
  alert("Oops! Not enough money to earn out there!");
  alert("However, we can lobby the government to issue bonds!");
  alert("And we can continue our feast hahaha!");
  bondCount = prompt(
    "how many bonds would you like to issue? (one bond = one million dollars)"
  );
  MOT += bondCount * 1;
  totalDebt += bondCount * 1.2;
}
function keyPressed() {
  if (key == "i") {
    MOT = MOT * 1 - 20;
    for (i = 0; i < capital.length; i++) {
      capital[i] = capital[i] * 1 + 4;
    }
  }
}
function crisis() {
      creditProblem = true;
  alert(
    "Breaking News: New COVID Variant Found! Financial Indexes Plunge, Industrial Production Stalls!"
  );
  alert(
    "International Creditors Begin to Cash the Government's Bonds Facing the Crisis"
  );
  // alert ("Gov: Together we have $ " +  totalWealth + " Million. That's simply not enough! We must sell our assets!");
  for (i = capital.length - 1; i >-1; i--) {
    capital[i] = capital[i]*1- (totalDebt-MOT)/banks.length;
  }
    MOT = 0;
    totalDebt = 0;
}
