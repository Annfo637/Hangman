/* Detta script hanterar funktioner som hör till admin-sidan */

//Variabler för olika DOM-element
const wordInput = document.querySelector("#addWordInput");
wordInput.addEventListener("input", validateWord);
const submitBtn = document.querySelector("#addWord");
submitBtn.disabled = true;

//Validerar så att ordet inte innehåller siffror,
//redan finns i ordlistan eller är tomt. Sätter input till gemener,
//för att förhindra att samma ord läggs till med versaler.
function validateWord() {
  submitBtn.classList.remove("button--inactive");
  submitBtn.classList.add("button__standard");
  let currentWord = wordInput.value.toLowerCase();
  let message = document.querySelector(".validationText");
  message.innerHTML = "";
  console.log(currentWord);
  if (new RegExp("[0-9]").test(currentWord)) {
    submitBtn.disabled = true;
    message.innerHTML = "OBS! Ordet får inte innehålla siffror";
  } else if (myWords.includes(currentWord)) {
    submitBtn.disabled = true;
    message.innerHTML = "OBS! Ordet finns redan i ordlistan";
  } else if (currentWord.length === 0) {
    submitBtn.disabled = true;
    submitBtn.classList.remove("button__standard");
    submitBtn.classList.add("button--inactive");
    message.innerHTML = "OBS! Du måste fylla i ett ord";
  } else {
    submitBtn.disabled = false;
  }
}
