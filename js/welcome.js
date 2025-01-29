const introText = document.querySelector(".intro");
const countryName = document.querySelector(".country");
const btn = document.querySelector("#btn");
const userName = document.getElementById("username");
const allNames = document.getElementById("allUsersnames");

window.addEventListener("DOMContentLoaded", (event) => {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    allNames.innerText = `Welcome ${savedName}`; // Display the saved name
  }
});

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

let random = Math.floor(Math.random() * countriesData.length);
introText.innerText = countriesData[random].intro;
countryName.innerText = countriesData[random].country;
const selectedCapital = countriesData[random].capital;

btn.addEventListener("click", function () {
  localStorage.setItem("capital", selectedCapital);
  window.location.href = "game-one.html";
});
