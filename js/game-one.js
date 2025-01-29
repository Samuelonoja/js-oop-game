const countryFlags = document.getElementById("flags");
const displayPoint = document.getElementById("point")

const countriesData = [
  {
    intro: "Welcome to Nigeria",
    country: "Nigeria",
    flag: "flags/nigeria.jpg",
    capital: "Abuja",
  },

  {
    intro: "Welcome to France",
    country: "France",
    capital: "Paris",
  },

  {
    intro: "Welcome to Portugal",
    country: "Portugal",
    capital: "Lisbon",
  },

  {
    intro: "Welcome to Vietnam",
    country: "Vietnam",
    capital: "Hanoi",
  },

  {
    intro: "Welcome to India",
    country: "India",
    capital: "Delhi",
  },
];

let points = 0;
displayPoint.innerText = "Points:" + points;
//const leaderBoard = [];
let choice = [];

const storedPerson = localStorage.getItem("capital");
const playerName = localStorage.getItem("userName");
choice.push(storedPerson);

//using filter to add additional element to our choices array
const secondChoice = countriesData.filter(function (element, index) {
  return index < 2;
});

secondChoice.forEach(function (element) {
  const people = element.capital;

  // Only add `people` if it doesn't already exist in `choice`
  if (!choice.includes(people)) {
    choice.push(people);
  }
});
//console.log(choice);

//testing player
class Traveller {
  constructor() {
    this.width = 7;
    this.height = 10;
    this.positionX = 45 - this.width/2;
    this.positionY = 0;

    this.playerobj = document.getElementById("player");
    this.updateUi();
  }

  updateUi() {
    this.playerobj.style.left = this.positionX + "vw";
    this.playerobj.style.bottom = this.positionY + "vh";
    this.playerobj.style.height = this.height + "vh";
    this.playerobj.style.width = this.width + "vw";

    this.playerobj.style.backgroundImage = "url(./flags/Plane.png)";
    this.playerobj.style.backgroundSize = "cover";
  }

  moveLeft() {
    if(this.positionX > 0){
      this.positionX--;
      this.updateUi();
    }
  }
  moveRight() {
    if(this.positionX < 90 - this.width){
      this.positionX++;
      this.updateUi();
    }
  }
}

// Choice Obstacle Class
class Obstacle {
  constructor(choice) {
    this.width = 7;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = 80;
    this.isActive = true;

    const randomCountryChoice =
      choice[Math.floor(Math.random() * choice.length)];
    this.country = randomCountryChoice;

    this.createObstacles();
  }

  createObstacles() {
    this.obstacleElement = document.createElement("div");
    this.obstacleElement.className = "obstacle";

    //this.obstacleElement.textContent = this.country;
    this.obstacleElement.style.backgroundImage = `url(./flags/${this.country}.png`;
    this.obstacleElement.style.backgroundSize = "cover";

    this.obstacleElement.style.width = this.width + "vw";
    this.obstacleElement.style.height = this.height + "vh";
    this.obstacleElement.style.left = this.positionX + "vw";
    this.obstacleElement.style.bottom = this.positionY + "vh";

    const parentElement = document.getElementById("board");
    parentElement.appendChild(this.obstacleElement);
  }

  moveDown() {
    this.positionY--;
    this.obstacleElement.style.bottom = this.positionY + "vh";
  }
}

const myTraveller = new Traveller();

const myObstaclesArr = [];

setInterval(function () {
  const myObstacle = new Obstacle(choice);
  myObstaclesArr.push(myObstacle);
}, 5000);

setInterval(function () {
  myObstaclesArr.forEach(function (myObstacleElements) {
    myObstacleElements.moveDown();

    if (
      myTraveller.positionX <
        myObstacleElements.positionX + myObstacleElements.width &&
      myTraveller.positionX + myTraveller.width >
        myObstacleElements.positionX &&
      myTraveller.positionY <
        myObstacleElements.positionY + myObstacleElements.height &&
      myTraveller.positionY + myTraveller.height >
        myObstacleElements.positionY &&
      myObstacleElements.isActive === true
    ) {
      console.log(
        "collision detected with " + myObstacleElements.country + "!!"
      );

      if (myObstacleElements.country === storedPerson) {
        console.log("it works");
        points++;
        let displayPoint = document.getElementById("point");
        displayPoint.innerText = "Points: " + points;
        myObstacleElements.isActive = false;
      } else {
        //Point-- (Note: let your points start increasing from when you randomly select a country)
        if (points > 1) points--;
        displayPoint.innerText = "Points: " + points;
        myObstacleElements.isActive = false;
      }
      console.log(points);
    }
  });
}, 100);

document.addEventListener("keydown", function (key) {
  if (key.code === "ArrowRight") {
    myTraveller.moveRight();
  } else if (key.code === "ArrowLeft") {
    myTraveller.moveLeft();
  }
});
