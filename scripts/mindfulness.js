//Hamburger for mobileresponsiveness 
const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');

    // Toggle the icon
    if (menu.classList.contains('active')) {
      hamburger.innerHTML = '&times;'; // ✖
    } else {
      hamburger.innerHTML = '&#9776;'; // ☰
    }
  });

  let duration = 180; // 3 minutes
let timer;
let breathCycle;
let timerRunning = false;
let breathingStarted = false;

const breathText = document.getElementById("breath-text");
const circle = document.getElementById("circle");
const audio = document.getElementById("ambientSound");
const soundToggle = document.getElementById("soundToggle");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const steps = [
  { text: "Breathe In", size: 1.5, time: 4000 },
  { text: "Hold", size: 1.5, time: 4000 },
  { text: "Breathe Out", size: 1, time: 4000 }
];
let stepIndex = 0;

// Event listeners instead of onclick
startBtn.addEventListener("click", startSession);
resetBtn.addEventListener("click", resetSession);

// Start session
function startSession() {
  if (timerRunning) return;
  timerRunning = true;
  startBreathing();
  startTimer();
  if (soundToggle.checked) audio.play();
}

// Breathing animation
function startBreathing() {
  if (breathingStarted) return;
  breathingStarted = true;
  runBreathingCycle();
}

function runBreathingCycle() {
  const step = steps[stepIndex];
  breathText.textContent = step.text;
  circle.style.transform = `scale(${step.size})`;

  breathCycle = setTimeout(() => {
    stepIndex = (stepIndex + 1) % steps.length;
    runBreathingCycle();
  }, step.time);
}

// Timer countdown
function startTimer() {
  timer = setInterval(() => {
    if (duration > 0) {
      duration--;
      updateDisplay();
    } else {
      clearInterval(timer);
      clearTimeout(breathCycle);
      timerRunning = false;
      breathText.textContent = "Session Complete";
      incrementSession();
      audio.pause();
      audio.currentTime = 0;
    }
  }, 1000);
}

function updateDisplay() {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  document.getElementById("timer-display").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resetSession() {
  clearInterval(timer);
  clearTimeout(breathCycle);
  duration = 180;
  timerRunning = false;
  breathingStarted = false;
  stepIndex = 0;
  updateDisplay();
  breathText.textContent = "Click Start to Begin";
  circle.style.transform = "scale(1)";
  audio.pause();
  audio.currentTime = 0;
}

function incrementSession() {
  let count = localStorage.getItem("sessionCount") || 0;
  count++;
  localStorage.setItem("sessionCount", count);
  document.getElementById("sessionCount").textContent = count;
}

// Toggle sound
soundToggle.addEventListener("change", () => {
  if (soundToggle.checked) {
    audio.play();
  } else {
    audio.pause();
  }
});

// On load
window.onload = () => {
  document.getElementById("sessionCount").textContent =
    localStorage.getItem("sessionCount") || 0;
  updateDisplay();
};