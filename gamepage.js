/* Detta script sköter diverse funktioner på spelsidan. */

//Variabler för olika DOM-element
const gameWord = document.querySelector("#game__word");
const word = document.querySelector("#word");
const gameGraphics = document.querySelector("#game__graphics");
const gameAlphabet = document.querySelector("#game__alphabet");
const randomwordBtn = document.querySelector("#randomWord");
const graphicsWrapper = document.querySelector("#graphicsWrapper");
const graphicsImage = document.querySelector("#graphicsImage");
//Variabler för värden som ska användas globalt
let errors = 0;
//let myWords = [];

/*if (JSON.parse(localStorage.getItem("words")) !== null) {
  myWords = JSON.parse(localStorage.getItem("words"));
} else {
  myWords = [];
}*/
initializeGame();

//Funktion som körs vid spelstart, ritar ut alfabet, slumpar ord och
//sätter grafiken till startläge.
function initializeGame() {
  gameAlphabet.innerHTML = "";
  alphabet.forEach(function (item) {
    const letterBtn = document.createElement("button");
    letterBtn.textContent = item;
    letterBtn.classList.add("button__letter");
    letterBtn.classList.add(item);
    letterBtn.addEventListener("click", checkLetter);

    gameAlphabet.appendChild(letterBtn);
  });
  if (myWords.length !== 0) {
    randomizeWord();
    //setGraphics(errors);
  } else {
    let message = document.createElement("h4");
    message.classList.add("gamepage__message");
    message.textContent =
      "Ordlistan är tom, klicka på Admin-knappen för att lägga till ord.";
    gameWord.appendChild(message);
  }
}

//Funktion som slumpar fram ett ord och ritar ut strecken
function randomizeWord() {
  //Börja med ett tomt word-element
  word.innerHTML = "";
  const randomWord = myWords[Math.floor(Math.random() * myWords.length)];
  console.log(randomWord);

  //lägg varje bokstav i ordet i ett spanelement
  for (let i = 0; i < randomWord.length; i++) {
    const letter = document.createElement("span");
    letter.textContent = randomWord[i];
    letter.classList.add("word__letter");
    letter.classList.add("hide__letter");
    letter.classList.add(randomWord[i]);

    word.appendChild(letter);
  }
}

//Lyssnare till knappen Slumpa nytt ord som anropar randomizeWord()
randomwordBtn.addEventListener("click", randomizeWord);

//Funktion som kontrollerar ifall klickad bokstav finns i ordet
function checkLetter(event) {
  let currentBtn = event.currentTarget;
  // Gå vidare endast om knappen ej är klickad innan
  if (!currentBtn.classList.contains("button__clicked")) {
    currentBtn.classList.add("button__clicked");
    let currentLetter = event.currentTarget.textContent;

    let letters = Array.from(word.querySelectorAll("span"));

    //filtrera fram de bokstäver som kvarstår och som matchar klickad bokstav
    let hiddenLetters = letters.filter(function (letter) {
      return letter.classList.contains("hide__letter");
    });
    let matchedLetters = hiddenLetters.filter(function (letter) {
      return letter.classList.contains(currentLetter);
    });

    if (matchedLetters.length !== 0) {
      correctGuess(matchedLetters);
    } else {
      wrongGuess();
    }
  }
}

//Funktion som uppdaterar ordet efter korrekt gissning
function correctGuess(matchArr) {
  matchArr.forEach(function (letter) {
    letter.classList.replace("hide__letter", "show__letter");
  });
  //kontrollera om det fortfarande finns dolda bokstäver, annars anropa gameFinished
  let remainingLetters = Array.from(word.children).filter(function (letter) {
    return letter.classList.contains("hide__letter");
  });
  if (remainingLetters.length === 0) {
    gameFinished();
  }
}

//Funktion som uppdaterar antalet fel och anropar grafik-funktionen
function wrongGuess() {
  errors++;
  setGraphics(errors);
}

//Funktion som uppdaterar grafiken utifrån antal fel spelaren gjort
function setGraphics(int) {
  //Har man uppnått 7 fel så är spelet förlorat
  if (int === 7) {
    graphicsImage.src = `images/flower-gameover.png`;
    graphicsWrapper.appendChild(graphicsImage);
    gameFinished();
  }
  //ändra bild utifrån antal fel
  graphicsImage.src = `images/flower-${int}.png`;
  graphicsWrapper.appendChild(graphicsImage);
  //Nedan ritar ut vald grafik, för tillfället endast en p-tagg
  /*let currentGraphic = document.createElement("p");
  currentGraphic.textContent = `Antal fel: ${int}`;
  gameGraphics.appendChild(currentGraphic);*/
}

//Funktion som kontrollerar om spelet är över och meddelar vinst eller förlust
function gameFinished() {
  if (errors === 7) {
    alert("Du förlorade!");
    errors = 0;
    initializeGame();
  } else {
    alert("Du vann!");
    initializeGame();
  }
}
