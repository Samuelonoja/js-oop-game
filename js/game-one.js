const countryFlags = document.getElementById("flags");

const quotes = [
  {
    intro: "Welcome to Nigeria",
    country: "Nigeria",
    capital: "Abuja"
  },

  {
    intro: "Welcome to France",
    country: "France",
    capital: "Paris"
  },

  {
    intro: "Welcome to Portugal",
    country: "Portugal",
    capital: "Lisbon"
  },

  {
    intro: "Welcome to Vietnam",
    country: "Vietnam",
    capital: "Hanoi"
  },

  {
    intro: "Welcome to India",
    country: "India",
    capital: "Delhi"
  },
];

let points = 0;
const leaderBoard = [{}];
let choice = [];

const storedPerson = localStorage.getItem("capital");
const playerName = localStorage.getItem("userName");
choice.push(storedPerson);

//using filter to add additional element to our choices array
const secondChoice = quotes.filter(function (element, index) {
  return index < 2;
});

secondChoice.forEach(function (element) {
  const people = element.capital;

  // Only add `people` if it doesn't already exist in `choice`
  if (!choice.includes(people)) {
    choice.push(people);
  }
});
console.log(choice);

//countryFlags.append(choice)

//testing player
class Traveller {
  constructor() {
    this.positionX = 30;
    this.positionY = 0;
    this.width = 7;
    this.height = 10;

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
    this.positionX--;
    this.updateUi();
  }
  moveRight() {
    this.positionX++;
    this.updateUi();
  }
}

// HOW TO GET RANDOM ELEMENT FROM ARRAY
//flagsArr[Math.floor(Math.random() * flagArray.length)]

//create the Obstacle(flag) class
// select a random flag
// make it move down
// detect collision
// if collision with country selected in the main screen, point++ i.e
// if collision with country that isn't the selected one, point-- i.e

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
    this.obstacleElement.style.backgroundSize = 'cover';
    

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
      myTraveller.positionX < myObstacleElements.positionX + myObstacleElements.width &&
      myTraveller.positionX + myTraveller.width > myObstacleElements.positionX &&
      myTraveller.positionY < myObstacleElements.positionY + myObstacleElements.height &&
      myTraveller.positionY + myTraveller.height > myObstacleElements.positionY
      && myObstacleElements.isActive === true
    ) {
     

      console.log("collision detected with " + myObstacleElements.country + "!!");
      


      if(myObstacleElements.country === storedPerson){
        //Congratulation to next challenge
        //myObstacleElements.isActive = true;
        console.log("it works")
        points++;
        myObstacleElements.isActive = false;

        // if(points> 5){
        //   leaderBoard.push(
        //     name: playerName,
        //     "points": points,

        //   )
  
        //   localStorage.setItem("leaderboard", leaderBoard);
        //   window.location.href = "couy.html";
        // }        
      }

      else{
        //Point-- (Note: let your points start increasing from when you randomly select a country)
        if(points > 1)
          points--;
        myObstacleElements.isActive = false;
      }
      console.log(points)
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