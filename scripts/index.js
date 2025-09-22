document.addEventListener("DOMContentLoaded", () => {
  // --- Slider with quotes ---
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slides img');
  const dots = document.querySelectorAll('.dots span');
  const sliderQuoteElement = document.getElementById('slider-quote');
  const featuredQuoteElement = document.getElementById('featured-quote');

  // Quotes corresponding to each slide
  const quotes = [
    "Eat healthy, live healthy.",
    "Your body deserves the best.",
    "Wellness is a lifestyle.",
    "Small Steps, Big Changes."
  ];

  function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  slides[n].classList.add('active');
  dots[n].classList.add('active');

  sliderQuoteElement.innerText = quotes[n];
  slideIndex = n;
}

  function changeSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  // Dots click event
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }, 4000);

  // Show initial slide
  showSlide(slideIndex);

  // --- Featured Content (daily rotation) ---
const featuredContent = {
  quotes: [
    "Eat healthy, live healthy.",
    "Your body deserves the best.",
    "Wellness is a lifestyle.",
    "Small steps, big changes."
  ],
  tips: [
    "Drink at least 2L of water daily.",
    "Get 8 hours of sleep every night.",
    "Stretch for 5 minutes after waking up.",
    "Take deep breaths throughout your day."
  ],
  recipes: [
    "Try a green smoothie with spinach, banana, and almond milk.",
    "Make a colorful salad with quinoa, chickpeas, and veggies.",
    "Overnight oats with berries for a quick breakfast.",
    "Avocado toast with a squeeze of lemon."
  ],
  mindfulness: [
    "Take 5 minutes to focus on your breath.",
    "Practice gratitude: write down 3 things you’re thankful for.",
    "Unplug from screens for 30 minutes today.",
    "Go for a mindful walk and notice your surroundings."
  ]
};

const dayIndex = new Date().getDay(); // 0 = Sunday

document.getElementById("featured-quote").innerText =
  featuredContent.quotes[dayIndex % featuredContent.quotes.length];

document.getElementById("featured-tip").innerText =
  featuredContent.tips[dayIndex % featuredContent.tips.length];

document.getElementById("featured-recipe").innerText =
  featuredContent.recipes[dayIndex % featuredContent.recipes.length];

document.getElementById("featured-mindfulness").innerText =
  featuredContent.mindfulness[dayIndex % featuredContent.mindfulness.length];

  // --- Subscribe form ---
  const subscribeForm = document.querySelector('form'); // select footer form
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh
    const email = document.getElementById('email').value.trim();
    if (email) {
      console.log("Subscribed email:", email);
      alert("Thanks for subscribing, " + email + "!");
      document.getElementById('email').value = "";
    }
  });
});

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