
// // navbar
// document.getElementsByClassName("navbar")


// ################################################ AUTO TYPER ##########################################
const words = [
  { text: "Computer Engineer 💻",     color: "#f97316" },  // orange
  { text: "AI/ML Developer 🤖",   color: "#38bdf8" },  // blue
  { text: "Web Developer 🌐", color: "#22c55e" },  // green
  { text: "Programmer 📟",        color: "#e5ff22ff" },  // yellow
  { text: "Gamer 🎮",             color: "#ee6969ff" }   // red
];

const typingSpeed = 80;    // ms per character
const erasingSpeed = 50;    // ms per character
const wordDelay = 1300;     // pause before erase

let wordIndex = 0;
let charIndex = 0;

const typerwriter_target = document.getElementById("typewriter");

function type() {
  const currentWord = words[wordIndex];
  
  // Set color for current word
  typerwriter_target.style.color = currentWord.color;
  
  if (charIndex < currentWord.text.length) {
    typerwriter_target.textContent += currentWord.text.charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, wordDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typerwriter_target.textContent = typerwriter_target.textContent.slice(0, -1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  }
}
// Start typing on load3
type();

// ################################################ CARD FLIP ##########################################
document.querySelectorAll(".card").forEach(card => {      /* ---------- Always Enable Click ---------- */
  card.addEventListener("click", e => {
    e.stopPropagation();
    card.classList.toggle("is-flipped");
  });
});