// ==============================
// RECIPE DATA ARRAY
// ==============================

const recipes = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    time: 25,
    difficulty: "easy",
    description: "A quick and creamy pasta loaded with garlic and cheese.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Veggie Stir Fry",
    time: 20,
    difficulty: "easy",
    description: "Colorful vegetables tossed in a savory soy-ginger sauce.",
    category: "salad"
  },
  {
    id: 3,
    title: "Chicken Biryani",
    time: 75,
    difficulty: "hard",
    description: "Aromatic basmati rice layered with spiced chicken.",
    category: "curry"
  },
  {
    id: 4,
    title: "Grilled Paneer Skewers",
    time: 35,
    difficulty: "medium",
    description: "Smoky grilled paneer cubes marinated in Indian spices.",
    category: "curry"
  },
  {
    id: 5,
    title: "Classic Caesar Salad",
    time: 15,
    difficulty: "easy",
    description: "Crisp lettuce, parmesan, and creamy Caesar dressing.",
    category: "salad"
  },
  {
    id: 6,
    title: "Beef Lasagna",
    time: 90,
    difficulty: "hard",
    description: "Layers of pasta, rich meat sauce, and melted cheese.",
    category: "pasta"
  },
  {
    id: 7,
    title: "Mushroom Risotto",
    time: 50,
    difficulty: "medium",
    description: "Creamy Italian rice slow-cooked with mushrooms.",
    category: "pasta"
  },
  {
    id: 8,
    title: "Spicy Thai Curry",
    time: 60,
    difficulty: "medium",
    description: "A bold and spicy coconut curry with vegetables.",
    category: "curry"
  }
];


// ==============================
// DOM SELECTION
// ==============================

const recipeContainer = document.querySelector("#recipe-container");


// ==============================
// CREATE RECIPE CARD FUNCTION
// ==============================

const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};


// ==============================
// RENDER RECIPES FUNCTION
// ==============================

const renderRecipes = (recipesArray) => {
  // Convert each recipe object into HTML
  const recipesHTML = recipesArray
    .map(recipe => createRecipeCard(recipe))
    .join('');

  // Insert all recipe cards into the DOM
  recipeContainer.innerHTML = recipesHTML;
};


// ==============================
// INITIALIZE APP
// ==============================

// Render all recipes when the page loads
renderRecipes(recipes);
