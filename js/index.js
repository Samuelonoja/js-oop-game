const nameInput = document.getElementById("name");
const playNow = document.querySelector(".enter-game");
const gameInstruction = document.querySelector(".instructions");
const dialog = document.getElementById("dialog-container");
const closeDialog = document.getElementById("close-dialog")

//adding eventlisteners 
gameInstruction.addEventListener("click", function(){
  dialog.style.visibility = "visible";
  playNow.style.visibility = "hidden";
   
})

closeDialog.addEventListener("click", function(){
  dialog.style.visibility = "hidden";
  playNow.style.visibility = "visible";
})

playNow.addEventListener("click", function () {
  nameInput.style.visibility = "visible";
  playNow.style.visibility = "hidden";
});

//event listener for the input text field and storing the input locally
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
