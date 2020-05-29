/* Detta script hanterar funktioner på spelsidan.
 * Initiera spelet, slumpa ord, uppdatera grafiken,
 * kontrollera om bokstäver finns eller ej i ordet,
 * kontrollera när vinst respektive förlust inträffar
 * samt visa/dölja instruktioner */

//Variabler för olika DOM-element samt en variabel för antal fel
const gameWord = document.querySelector("#game__word");
const word = document.querySelector("#word");
const gameGraphics = document.querySelector("#game__graphics");
const gameAlphabet = document.querySelector("#game__alphabet");
const randomwordBtn = document.querySelector("#randomWord");
const helpBtn = document.querySelector("#helpBtn");
const instructions = document.querySelector("#instructions");
const graphicsWrapper = document.querySelector("#graphicsWrapper");
const graphicsImage = document.querySelector("#graphicsImage");

let errors;
initializeGame();

//Funktion som körs vid spelstart, ritar ut alfabet samt anropar
//hjälpfunktioner som slumpar ord och sätter grafiken till startläge.
function initializeGame() {
  errors = 0;
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
    setGraphics(errors);
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
  word.innerHTML = "";
  const randomWord = myWords[Math.floor(Math.random() * myWords.length)];

  console.log(randomWord);

  //lägg varje bokstav i ordet i ett spanelement och dölj bokstaven
  for (let i = 0; i < randomWord.length; i++) {
    const letter = document.createElement("span");
    letter.textContent = randomWord[i];
    letter.classList.add("word__letter");
    letter.classList.add("hide__letter");
    letter.classList.add(randomWord[i]);

    word.appendChild(letter);
  }
}

//Lyssnare till knappen Slumpa nytt ord som startar om spelet
randomwordBtn.addEventListener("click", initializeGame);

//Funktion som kontrollerar ifall klickad bokstav finns i ordet
function checkLetter(event) {
  let currentBtn = event.currentTarget;
  // Gå vidare endast om knappen ej är klickad innan
  if (!currentBtn.classList.contains("button__clicked")) {
    currentBtn.classList.add("button__clicked");
    let currentLetter = event.currentTarget.textContent;
    let letters = Array.from(word.querySelectorAll("span"));

    //Filtrera fram de bokstäver som kvarstår och som matchar klickad bokstav
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

  //Kontrollera om det fortfarande finns dolda bokstäver, annars anropa gameFinished
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
  if (int === 0) {
    graphicsImage.src = "images/flower-init.png";
    graphicsWrapper.appendChild(graphicsImage);
  }
  //Har man uppnått 7 fel så är spelet förlorat
  else if (int === 7) {
    gameFinished();
  } else {
    //Ändra bild utifrån antal fel
    graphicsImage.src = `images/flower-${int}.png`;
    graphicsWrapper.appendChild(graphicsImage);
  }
}

//Funktion som kontrollerar och meddelar vinst eller förlust
function gameFinished() {
  if (errors === 7) {
    graphicsImage.src = "images/flower-gameover.png";
    graphicsWrapper.appendChild(graphicsImage);
    alert("Åh nej, du förlorade!");
    errors = 0;
    initializeGame();
  } else {
    graphicsImage.src = "images/flower-win.png";
    graphicsWrapper.appendChild(graphicsImage);
    alert("Grattis, du vann!");
    errors = 0;
    initializeGame();
  }
}

//Visa/dölj instruktionerna
helpBtn.addEventListener("click", toggleInstructions);

function toggleInstructions() {
  if (instructions.classList.contains("hide")) {
    instructions.classList.remove("hide");
  } else {
    instructions.classList.add("hide");
  }
}
