/* Detta script hanterar funktioner som hör till admin-sidan och ordlistan */

//Variabler för olika DOM-element
const emptyWordlistBtn = document.querySelector("#emptyWordlist");
emptyWordlistBtn.addEventListener("click", emptyWordlist);
const wordlistContainer = document.querySelector("#wordlistContainer");
const wordlistMessage = document.querySelector("#wordlistMessage");
const submitWord = document.querySelector("#submitWord");
submitWord.addEventListener("submit", addWord);
const addWordInput = document.querySelector("#addWordInput");
//const addWordBtn = document.querySelector("#addWord");

const editSection = document.querySelector("#edit");
editSection.classList.add("hide");
const updateBtn = document.querySelector("#updateBtn");
updateBtn.addEventListener("click", updateWord);
const deleteBtn = document.querySelector("#deleteBtn");
deleteBtn.addEventListener("click", deleteWord);
const wordInput = document.querySelector("#editWordInput");

let currentWord = "";
let myWords = [];

if (JSON.parse(localStorage.getItem("words")) !== null) {
  myWords = JSON.parse(localStorage.getItem("words"));
} else {
  myWords = [];
}

//Funktion som lägger till nytt ord - GÖRAS OM FÖR DB
function addWord() {
  event.preventDefault();
  const newWord = addWordInput.value;
  //validera att ordet inte redan finns - ej klar
  myWords.push(newWord);
  addWordInput.value = "";
  updateLocalStorage();
  drawWordlist();
}

//Funktion som anropas vid klick på ord
function editWord(event) {
  currentWord = event.currentTarget.textContent;
  console.log(currentWord);
  submitWord.classList.add("hide");
  editSection.classList.remove("hide");
  wordInput.value = currentWord;
}

//Funktion som uppdaterar ord (stavning, böjning) - GÖRAS OM FÖR DB
function updateWord() {
  const editedWord = wordInput.value;
  let index = myWords.indexOf(currentWord);
  myWords[index] = editedWord;
  submitWord.classList.remove("hide");
  editSection.classList.add("hide");
  updateLocalStorage();
  drawWordlist();
}

//Funktion som tar bort ord - GÖRAS OM FÖR DB
function deleteWord() {
  const removedWord = myWords.filter(function (item) {
    return item !== currentWord;
  });
  myWords = removedWord;
  submitWord.classList.remove("hide");
  editSection.classList.add("hide");
  updateLocalStorage();
  drawWordlist();
}

//Funktion som rensar hela ordlistan - GÖRAS OM FÖR DB
function emptyWordlist() {
  myWords.length = 0;
  wordlistMessage.classList.remove("hide");
  wordlistContainer.classList.add("hide");
  localStorage.clear();
  drawWordlist();
}

function updateLocalStorage() {
  localStorage.clear();
  localStorage.setItem("words", JSON.stringify(myWords));
}
