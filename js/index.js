const nameInput = document.getElementById("name");
const playNow = document.querySelector(".enter-game");
const gameInstruction = document.querySelector(".instructions");

gameInstruction.addEventListener("click", function(){
  window.open("hello")
})

playNow.addEventListener("click", function () {
  nameInput.style.visibility = "visible";
  playNow.style.visibility = "hidden";
});

//let enteredName = "";
nameInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const enteredName = nameInput.value.trim();

    if (enteredName) {
      localStorage.setItem("userName", enteredName);
    }
    window.location.href = "welcome.html";
  }
});
