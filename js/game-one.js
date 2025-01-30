const countryFlags = document.getElementById("flags");
const displayPoint = document.getElementById("point")

const countriesData = [
  {
    intro: "You're going to explore...",
    country: "Nigeria",
    flag: "flags/nigeria.jpg",
    capital: "Abuja",
  },

  {
    intro: "You're going to explore...",
    country: "France",
    capital: "Paris",
  },

  {
    intro: "You're going to explore...",
    country: "Portugal",
    capital: "Lisbon",
  },

  {
    intro: "You're going to explore...",
    country: "Vietnam",
    capital: "Hanoi",
  },

  {
    intro: "You're going to explore...",
    country: "India",
    capital: "Delhi",
  },
];

let points = " "+2;
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
  moveUp() {
    if(this.positionY <= 80){
      this.positionY++;
      this.updateUi();
    }
  }
  movePlayerDown() {
    if(this.positionY > 0){
      this.positionY--;
      this.updateUi();
    }
  }
}

// Choice Obstacle Class
class Obstacle {
  constructor(choice) {
    this.width = 7;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (90 - this.width + 1)); 
    //this.positionX = 100 - this.width - 5;
    
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
}, 1000);

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
        points++;
        let displayPoint = document.getElementById("point");
        displayPoint.innerText = "Points: " + points;
        if(points===4){
           alert("madeit")
        }
        myObstacleElements.isActive = false;
      } else {
        //Point-- (Note: let your points start increasing from when you randomly select a country)
        if (points > 0) points--;
        displayPoint.innerText = "Points: " + points;
        myObstacleElements.isActive = false;
        if(points === 0){
           alert ("try again")
        }
      }
      console.log(points);
    }
  });
}, 30);

document.addEventListener("keydown", function (key) {
  if (key.code === "ArrowRight") {
    myTraveller.moveRight();
  } else if (key.code === "ArrowLeft") {
    myTraveller.moveLeft();
  }
  else if (key.code === "ArrowUp") {
    myTraveller.moveUp();
  }
  else if (key.code === "ArrowDown") {
    myTraveller.movePlayerDown();
  }
});
