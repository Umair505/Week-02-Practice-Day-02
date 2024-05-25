document.addEventListener("DOMContentLoaded", () => {
    fetchInitialMeals();
});

document.getElementById("search-btn").addEventListener("click", () => {
    const inputValue = document.getElementById("search-input").value;
    handleSearch(inputValue);
});

const mealContainer = document.getElementById("div-cart");
const mealDetailsContainer = document.getElementById("meal-details");

const fetchInitialMeals = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(res => res.json())
        .then(data => {
            if (data && data.meals) {
                displayMeal(data.meals);
            }
        });
};

const displayMeal = (foods) => {
    mealContainer.innerHTML = "";
    foods.forEach((meal) => {
        const div = document.createElement("div");
        div.classList.add("meal-cart");
        div.innerHTML = `
            <img class="cart-img" src=${meal.strMealThumb} alt=""/>
            <h3 class="title">${meal.strMeal}</h3>
        `;
        div.addEventListener("click", () => {
            fetchMealDetails(meal.idMeal);
        });
        mealContainer.appendChild(div);
    });
};

const fetchMealDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.meals) {
                displayMealDetails(data.meals[0]);
            }
        });
};

const displayMealDetails = (meal) => {
    mealDetailsContainer.innerHTML = `
        <button class="close-btn" onclick="closeMealDetails()">Close</button>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <h2>${meal.strMeal}</h2>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
    `;
    mealDetailsContainer.classList.remove("hidden");
};

const closeMealDetails = () => {
    mealDetailsContainer.classList.add("hidden");
};

const handleSearch = (meal) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.meals) {
                displayMeal(data.meals);
            } else {
                mealContainer.innerHTML = `<h2 class="not-found">Sorry Meal Not Found!</h2>`;
            }
        });
};
