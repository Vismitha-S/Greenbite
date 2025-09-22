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

  function animateValue(id, start, end, duration) {
      const obj = document.getElementById(id);
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }

    document.getElementById("calculate").addEventListener("click", () => {
      const age = parseInt(document.getElementById("age").value);
      const height = parseInt(document.getElementById("height").value);
      const weight = parseInt(document.getElementById("weight").value);
      const activity = parseFloat(document.getElementById("activity").value);
      const gender = document.querySelector("input[name='gender']:checked").value;

      if (!age || !height || !weight) {
        alert("Please fill all fields!");
        return;
      }

      let bmr;
      if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      const tdee = bmr * activity;

      // Macros
      const carbs = (tdee * 0.50) / 4;
      const protein = (tdee * 0.20) / 4;
      const fats = (tdee * 0.30) / 9;

      // Animate numbers
      animateValue("bmr", 0, Math.round(bmr), 1000);
      animateValue("tdee", 0, Math.round(tdee), 1000);

      document.getElementById("carbs").textContent = Math.round(carbs) + " g";
      document.getElementById("protein").textContent = Math.round(protein) + " g";
      document.getElementById("fats").textContent = Math.round(fats) + " g";

      // Progress bars relative to TDEE calories
      document.getElementById("carb-bar").style.width = "50%";
      document.getElementById("protein-bar").style.width = "20%";
      document.getElementById("fat-bar").style.width = "30%";
    });

    document.getElementById("reset").addEventListener("click", () => {
      document.getElementById("age").value = "";
      document.getElementById("height").value = "";
      document.getElementById("weight").value = "";
      document.getElementById("activity").value = "1.2";
      document.getElementById("bmr").textContent = 0;
      document.getElementById("tdee").textContent = 0;
      document.getElementById("carbs").textContent = "0 g";
      document.getElementById("protein").textContent = "0 g";
      document.getElementById("fats").textContent = "0 g";
      document.querySelectorAll(".progress").forEach(bar => bar.style.width = "0");
    });