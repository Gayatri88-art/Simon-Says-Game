let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0; 

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score");

// Get the audio elements
let startSound = document.getElementById("start-sound");
let keypressSound = document.getElementById("keypress-sound");
let gameOverSound = document.getElementById("gameover-sound");

// Start game on key press
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game Started!");
    started = true;

    // Play start sound
    startSound.play();

    levelUP();
  }
});

function gameFlash(btn) {
  if (!btn) return;
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 250);
}

// Level Up function
function levelUP() {
  userSeq = []; 
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];  
  let randBtn = document.querySelector(`#${randColor}`);

  if (!randBtn) {
    console.error(`Button with ID ${randColor} not found!`);  
    return;
  }

  gameSeq.push(randColor);
  console.log("Updated Game Sequence:", gameSeq);  

  setTimeout(() => gameFlash(randBtn), 500);
}

function checkAns() {
  let lastIdx = userSeq.length - 1;

  if (userSeq[lastIdx] !== gameSeq[lastIdx]) {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart`;

    
    gameOverSound.play();

    if (level > highScore) {
      highScore = level;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }

    // Make background red for 1s
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 1000); 

    reset();
    return;
  }

  if (userSeq.length === gameSeq.length) {
    setTimeout(levelUP, 1000);
  }
}

// Button click function
function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id"); 
  userSeq.push(userColor);

  // Play key press sound
  keypressSound.play();

  checkAns(); 
}

// Add event listeners to buttons
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

// Reset function
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
