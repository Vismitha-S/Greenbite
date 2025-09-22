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

let recipes = [];

// Fetch recipe data from JSON
fetch('recipes.json')
  .then(response => response.json())
  .then(data => {
    recipes = data;
    displayRecipes(recipes);
  })
  .catch(error => {
    console.error("Error loading recipes:", error);
  });

// Display recipe cards
function displayRecipes(data) {
  const container = document.getElementById("recipeContainer");
  container.innerHTML = "";

  data.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.recipeId = recipe.id;

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h4>${recipe.title}</h4>
      <p>${recipe.description}</p>
    `;

    container.appendChild(card);
  });
}

// Filter by name & category
function filterRecipes() {
  const search = document.getElementById("searchBox").value.toLowerCase();
  const category = document.getElementById("categorySelect").value;

  const filtered = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search) &&
    (category === "" || recipe.category === category)
  );

  displayRecipes(filtered);
}

// Event listeners
document.getElementById("searchBtn").addEventListener("click", filterRecipes);
document.getElementById("categorySelect").addEventListener("change", filterRecipes);

// Click card → show modal
document.getElementById("recipeContainer").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const recipeId = parseInt(card.dataset.recipeId);
  const recipe = recipes.find(r => r.id === recipeId);
  if (recipe) showModal(recipe);
});

// Show modal details
function showModal(recipe) {
  document.getElementById("modalTitle").innerText = recipe.title;
  document.getElementById("modalImage").src = recipe.image;
  document.getElementById("modalDescription").innerText = recipe.description;

  const ingredientsList = document.getElementById("modalIngredients");
  ingredientsList.innerHTML = "";
  recipe.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    ingredientsList.appendChild(li);
  });

  const stepsList = document.getElementById("modalSteps");
  stepsList.innerHTML = "";
  recipe.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });

  const nutritionTable = document.querySelector("#modalNutrition tbody");
  nutritionTable.innerHTML = "";
  for (let key in recipe.nutrition) {
    const row = `<tr><td>${key}</td><td>${recipe.nutrition[key]}</td></tr>`;
    nutritionTable.innerHTML += row;
  }

  document.getElementById("recipeModal").style.display = "block";
}

// Close modal
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("recipeModal").style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target.id === "recipeModal") {
    document.getElementById("recipeModal").style.display = "none";
  }
});