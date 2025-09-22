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

document.addEventListener('DOMContentLoaded', () => {
  const exercises = {
    arms: {
      none: [
        { name: "Push-ups", desc: "Keep your body straight, lower until elbows form ~90°, then push back up." },
        { name: "Tricep Dips", desc: "Use a chair/bench; bend elbows to lower body, push back up." },
        { name: "Diamond Push-ups", desc: "Hands form diamond under chest — targets triceps." }
      ],
      dumbbells: [
        { name: "Bicep Curls", desc: "Curl dumbbells up slowly, keeping elbows fixed." },
        { name: "Shoulder Press", desc: "Press dumbbells overhead while standing or seated." },
        { name: "Hammer Curls", desc: "Neutral grip; works brachialis and forearms." }
      ],
      bands: [
        { name: "Band Curls", desc: "Stand on band and curl handles upward." },
        { name: "Band Pull Aparts", desc: "Hold band and pull apart to work rear shoulders." },
        { name: "Overhead Band Extension", desc: "Anchor band and extend to work triceps." }
      ]
    },
    legs: {
      none: [
        { name: "Squats", desc: "Feet shoulder-width; sit back and drive through heels." },
        { name: "Lunges", desc: "Step forward and lower back knee toward floor." },
        { name: "Glute Bridges", desc: "Lie down, lift hips squeezing glutes." }
      ],
      dumbbells: [
        { name: "Goblet Squat", desc: "Hold dumbbell at chest and squat down." },
        { name: "Dumbbell Deadlift", desc: "Hinge at hips, keep back straight, lower dumbbells." },
        { name: "Dumbbell Lunges", desc: "Perform forward lunges holding dumbbells." }
      ],
      bands: [
        { name: "Band Squats", desc: "Band around feet/shoulders for resistance while squatting." },
        { name: "Monster Walks", desc: "Band above knees; take wide steps to work hip abductors." },
        { name: "Band Glute Bridge", desc: "Bridge with band around knees for extra tension." }
      ]
    },
    full: {
      none: [
        { name: "Burpees", desc: "Drop to plank, do a push-up, jump up — full body cardio." },
        { name: "Mountain Climbers", desc: "From plank, alternate driving knees toward chest." },
        { name: "Jumping Jacks", desc: "Classic cardio move, arms and legs open/close together." }
      ],
      dumbbells: [
        { name: "Thrusters", desc: "Squat into an overhead press with dumbbells." },
        { name: "Renegade Rows", desc: "Plank position, row each dumbbell toward ribs." },
        { name: "Clean & Press", desc: "Lift dumbbells to shoulders and press overhead." }
      ],
      bands: [
        { name: "Band Deadlift", desc: "Stand on band, hinge at hips and stand tall." },
        { name: "Band Chest Press", desc: "Anchor band behind and press forward." },
        { name: "Band Thrusters", desc: "Squat + press movement using band resistance." }
      ]
    }
  };

  const bodySelect = document.getElementById('bodyPart');
  const equipSelect = document.getElementById('equipment');
  const generateBtn = document.getElementById('generateBtn');
  const workoutList = document.getElementById('workoutList');

  generateBtn.addEventListener('click', generateWorkout);

  function pickRandomUnique(arr, n) {
    const copy = arr.slice();
    const out = [];
    while (out.length < n && copy.length > 0) {
      const idx = Math.floor(Math.random() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  }

  function clearAllRunningTimers() {
    document.querySelectorAll('.start-btn').forEach(btn => {
      if (btn.__timerId) {
        clearInterval(btn.__timerId);
        delete btn.__timerId;
      }
    });
  }

  function generateWorkout() {
    clearAllRunningTimers();
    workoutList.innerHTML = '';

    const body = bodySelect.value;
    const equipment = equipSelect.value;

    if (!exercises[body] || !Array.isArray(exercises[body][equipment])) {
      workoutList.innerHTML = '<p>No exercises available for this selection.</p>';
      return;
    }

    const chosen = exercises[body][equipment];
    const selected = pickRandomUnique(chosen, 3);

    selected.forEach(ex => {
      const box = document.createElement('div');
      box.className = 'exercise-box';
      const duration = ex.duration || 30;
      box.dataset.duration = String(duration);

      box.innerHTML = `
        <h3>${escapeHtml(ex.name)}</h3>
        <p>${escapeHtml(ex.desc)}</p>
        <div class="controls">
          <div style="flex:1">
            <div class="progress-bar"><div class="progress-fill"></div></div>
            <span class="timer-text">${duration}s</span>
          </div>
          <div>
            <button type="button" class="start-btn">Start</button>
            <button type="button" class="stop-btn" disabled>Stop</button>
          </div>
        </div>
      `;

      workoutList.appendChild(box);

      const startBtn = box.querySelector('.start-btn');
      const stopBtn = box.querySelector('.stop-btn');
      startBtn.addEventListener('click', startTimer);
      stopBtn.addEventListener('click', stopTimer);
    });
  }

  function startTimer(event) {
    const startBtn = event.currentTarget;
    const box = startBtn.closest('.exercise-box');
    const stopBtn = box.querySelector('.stop-btn');
    const bar = box.querySelector('.progress-fill');
    const text = box.querySelector('.timer-text');
    const duration = parseInt(box.dataset.duration, 10) || 30;

    if (startBtn.__timerId) return;

    let timeLeft = duration;
    bar.style.width = '0%';
    text.textContent = `${timeLeft}s`;
    startBtn.disabled = true;
    stopBtn.disabled = false;

    startBtn.__timerId = setInterval(() => {
      timeLeft--;
      text.textContent = `${timeLeft}s`;
      const percent = ((duration - timeLeft) / duration) * 100;
      bar.style.width = `${percent}%`;

      if (timeLeft <= 0) {
        clearInterval(startBtn.__timerId);
        delete startBtn.__timerId;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        text.textContent = 'Done!';
        bar.style.width = `100%`;
      }
    }, 1000);
  }

  function stopTimer(event) {
    const stopBtn = event.currentTarget;
    const box = stopBtn.closest('.exercise-box');
    const startBtn = box.querySelector('.start-btn');
    const bar = box.querySelector('.progress-fill');
    const text = box.querySelector('.timer-text');

    if (startBtn && startBtn.__timerId) {
      clearInterval(startBtn.__timerId);
      delete startBtn.__timerId;
    }
    startBtn.disabled = false;
    stopBtn.disabled = true;
    text.textContent = 'Stopped';
    bar.style.width = '0%';
  }

  function escapeHtml(str = '') {
    return String(str).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
});
