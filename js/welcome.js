const quoteText = document.querySelector(".quote");
const personName = document.querySelector(".person");
const btn = document.querySelector("#qbtn");
const userName = document.getElementById("username");
const allNames = document.getElementById("allnames");

window.addEventListener("DOMContentLoaded", (event) => {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    allNames.innerText = `Welcome ${savedName}`; // Display the saved name
  }
});

const quotes = [
  {
    intro: "Welcome to Nigeria",
    country: "Nigeria",
    flag: "flags/nigeria.jpg",
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

let random = Math.floor(Math.random() * quotes.length);
quoteText.innerText = quotes[random].intro;
personName.innerText = quotes[random].country;
const selectedCapital = quotes[random].capital;

btn.addEventListener("click", function () {
  // let random = Math.floor(Math.random() * quotes.length);
  // quoteText.innerText = quotes[random].quote;
  // personName.innerText = quotes[random].person;

  localStorage.setItem("capital", selectedCapital);
  const ex = localStorage.getItem("capital");
  console.log(ex);

  window.location.href = "game-one.html";
});