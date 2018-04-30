
var counterPerSecond = document.querySelector("#counterPerSecond");
var producersBox = document.querySelector("#producersBox");
var totalCookies = 0;
var timeInterval = 100;
var gameData = {};




var counter = {
  display: document.getElementById("counterCookies"),
  update: function() {counter.display.innerHTML = Math.ceil(totalCookies) + "<br>" + "cookies";}
}

var totalPerSecond = function() {
  var perSecond = 0;
  for(var i=0; i<producersListLength; i++) {
     perSecond += producersList[i].howMuchCookies * producersList[i].number * producersList[i].howOften;
  }
  counterPerSecond.innerHTML = "per second: " + perSecond.toFixed(1);
}

var bigCookie = {
  display: document.getElementById("cookie"),
  clicked: function (e) {
    e.preventDefault();
    totalCookies += 1;
    counter.update();
  }
}

bigCookie.display.addEventListener('click', bigCookie.clicked, false);
producersBox.addEventListener("click", producersClick, false);

function producersClick(e) {
  e.preventDefault();
  if(e.currentTarget !== e.target) {
    var item = e.target.classList[1];
    switch (item) {
    case "cursor":
        cursor.buy();
        cursor.display();
        break;
    case "grandma":
        grandma.buy();
        grandma.display();
        break;
    case "farm":
        farm.buy();
        farm.display();
        break;
    case "mine":
        mine.buy();
        mine.display();
        break;
    case "factory":
        factory.buy();
        factory.display();
        break;
    default:
        console.log("element unknown");
    }
  }
  e.stopPropagation();
}

var utility = {
  howOften: 1,
  perSecond: (this.howMuchCookies * this.number).toFixed(1),
  buy: function() {if(totalCookies>=this.price){totalCookies-=this.price; this.price+=Math.round((15/100)*this.price); this.number+=1; this.display(); counter.update();totalPerSecond();}},
  produce: function() {totalCookies += (this.howMuchCookies * this.howOften * this.number)/10;}, //============================
  display: function() {
    document.getElementsByClassName(this.id)[0].innerHTML = this.id +" " + this.number;
    document.getElementsByClassName(this.id)[1].innerHTML = "price: " + this.price + ", " + " cps: " + (this.howMuchCookies * this.number * this.howOften);
  }
}


var cursor = Object.create(utility);
cursor.id = "cursor";
cursor.howMuchCookies = 1;
cursor.howOften = 0.1;
cursor.price = 15;
cursor.number = 0;
cursor.display = function() {
    document.getElementsByClassName(this.id)[1].innerHTML = "price: " + this.price + ", " + " cps: " + (this.howMuchCookies * this.number * this.howOften).toFixed(1);
}

var grandma = Object.create(utility);
grandma.id = "grandma";
grandma.howMuchCookies = 1;
grandma.price = 100;
grandma.number = 0;

var farm = Object.create(utility);
farm.id = "farm";
farm.howMuchCookies = 8;
farm.price = 1100;
farm.number = 0;

var mine = Object.create(utility);
mine.id = "mine";
mine.howMuchCookies = 47;
mine.price = 12000;
mine.number = 0;

var factory = Object.create(utility);
factory.id = "factory";
factory.howMuchCookies = 260;
factory.price = 130000;
factory.number = 0;

var producersList = [cursor, grandma, farm, mine, factory];
var producersListLength = producersList.length;

function displayAll() {
  for(var i=0; i<producersListLength; i++) {
    producersList[i].display();
  }
}
displayAll();

function produceAll() {
   for(var i=0; i<producersListLength; i++) {
     producersList[i].produce();
   }
}

function gameLoop() {
  produceAll();
  counter.update();
}
setInterval(gameLoop, 100);

function saveGame() {
  gameData = {
    cursorNumber: cursor.number,
    cursorPrice: cursor.price,
    grandmaNumber: grandma.number,
    grandmaPrice: grandma.price,
    farmNumber: farm.number,
    farmPrice: farm.price,
    mineNumber: mine.number,
    minePrice: mine.price,
    factoryNumber:factory.number,
    factoryPrice: factory.price,
    totalCookiesBaked: totalCookies
  };
  localStorage.cookieClickerSaves = JSON.stringify(gameData);
  gameData = JSON.parse(localStorage.cookieClickerSaves);
}
setInterval(saveGame, 20000);


function startGame() {
  if(localStorage.cookieClickerSaves) {
    var storedData = JSON.parse(localStorage.cookieClickerSaves);
    cursor.number = storedData.cursorNumber;
    cursor.price = storedData.cursorPrice;
    grandma.number = storedData.grandmaNumber;
    grandma.price = storedData.grandmaPrice;
    farm.number = storedData.farmNumber;
    farm.price = storedData.farmPrice;
    mine.number = storedData.mineNumber;
    mine.price = storedData.minePrice;
    factory.number = storedData.factoryNumber;
    factory.price = storedData.factoryPrice;
    totalCookies = storedData.totalCookiesBaked;
    totalPerSecond();
  }else{
    saveGame();
    localStorage.cookieClickerInit = JSON.stringify(gameData);
  }
  displayAll()
}


function restartGame() {
  if(localStorage.cookieClickerInit) {
    var initData = JSON.parse(localStorage.cookieClickerInit);
    cursor.number = initData.cursorNumber;
    cursor.price = initData.cursorPrice;
    grandma.number = initData.grandmaNumber;
    grandma.price = initData.grandmaPrice;
    farm.number = initData.farmNumber;
    farm.price = initData.farmPrice;
    mine.number = initData.mineNumber;
    mine.price = initData.minePrice;
    factory.number = initData.factoryNumber;
    factory.price = initData.factoryPrice;
    totalCookies = initData.totalCookiesBaked;
  }
  localStorage.removeItem("cookieClickerSaves");
  totalPerSecond();
  displayAll();
}

startGame();



