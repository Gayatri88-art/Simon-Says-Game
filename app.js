
let gameSeq = [];
let userSeq = [];

let btn = ["red", "yellow", "purple", "green"];  // ✅ FIXED: "btns" should be "btn"

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game has started");
    started = true;

    levelUP();
  }
});

function btnFlash(btnElement) {
  btnElement.classList.add("flash");
  setTimeout(function () {
    btnElement.classList.remove("flash");
  }, 250);
}

function levelUP() {
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4); 
  let randColor = btn[randIdx];  
  let randBtn = document.querySelector(`.${randColor}`);

  console.log(randIdx);
  console.log(randColor);
  console.log(randBtn);

  btnFlash(randBtn);  
}
