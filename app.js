(() => {

const recipes = [
  { id:1, title:"Spaghetti", time:30, difficulty:"easy", ingredients:["pasta","tomato"], description:"Classic pasta" },
  { id:2, title:"Chicken Curry", time:45, difficulty:"medium", ingredients:["chicken","curry"], description:"Spicy curry" },
  { id:3, title:"Beef Steak", time:50, difficulty:"hard", ingredients:["beef","pepper"], description:"Juicy steak" },
  { id:4, title:"Salad Bowl", time:15, difficulty:"easy", ingredients:["lettuce","tomato"], description:"Healthy salad" },
  { id:5, title:"Pancakes", time:20, difficulty:"easy", ingredients:["flour","milk"], description:"Breakfast favorite" },
  { id:6, title:"Biryani", time:60, difficulty:"hard", ingredients:["rice","chicken"], description:"Indian classic" },
  { id:7, title:"Omelette", time:10, difficulty:"easy", ingredients:["egg","onion"], description:"Quick meal" },
  { id:8, title:"Soup", time:25, difficulty:"medium", ingredients:["vegetables"], description:"Warm soup" }
];

let favorites = JSON.parse(localStorage.getItem("recipeFavorites")) || [];
let currentFilter = "all";
let searchQuery = "";
let debounceTimer;

const container = document.getElementById("recipe-container");
const counter = document.getElementById("recipe-counter");
const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-search");

const createRecipeCard = recipe => {
  const isFav = favorites.includes(recipe.id);
  return `
    <div class="recipe-card">
      <span class="favorite-btn ${isFav ? "active" : ""}" data-id="${recipe.id}">❤</span>
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <small>${recipe.time} mins | ${recipe.difficulty}</small>
    </div>
  `;
};

const applySearch = data => {
  const q = searchQuery.toLowerCase();
  return data.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.ingredients.some(i => i.toLowerCase().includes(q))
  );
};

const applyFilter = data => {
  if(currentFilter === "favorites") return data.filter(r => favorites.includes(r.id));
  if(currentFilter === "all") return data;
  return data.filter(r => r.difficulty === currentFilter);
};

const updateCounter = shown => {
  counter.textContent = `Showing ${shown} of ${recipes.length} recipes`;
};

const updateDisplay = () => {
  let result = applySearch(recipes);
  result = applyFilter(result);

  container.innerHTML = result.map(createRecipeCard).join("");
  updateCounter(result.length);
};

const toggleFavorite = id => {
  id = Number(id);
  favorites = favorites.includes(id)
    ? favorites.filter(f => f !== id)
    : [...favorites, id];

  localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
  updateDisplay();
};

searchInput.addEventListener("input", e => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchQuery = e.target.value;
    clearBtn.classList.toggle("hidden", !searchQuery);
    updateDisplay();
  }, 300);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  clearBtn.classList.add("hidden");
  updateDisplay();
});

container.addEventListener("click", e => {
  if(e.target.classList.contains("favorite-btn")){
    toggleFavorite(e.target.dataset.id);
  }
});

document.querySelectorAll("[data-filter]").forEach(btn =>
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    updateDisplay();
  })
);

updateDisplay();

})();
