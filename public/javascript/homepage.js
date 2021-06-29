let userInput = 'miso';
let recipeCardsEl = document.querySelector('#recipeContainer');
const categories = document.querySelectorAll(".btn-group > button.btn");
let recipeId;



//==================== recipe cards on homepage ====================//
//grab value from categories
  for(var i=0; i<categories.length; i++){
    categories[i].addEventListener("click", function(){
      userInput = this.value;
      recipeFetch(userInput)
    });
}

//grab value from search
$('#search-form').on('click', function() {
  userInput =  document.querySelector('#recipe-search').value.trim()
  recipeFetch(userInput)
})

var recipeFetch = function (input) {
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + input, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "30f04bca87mshb6f84916c7e0709p18c5ebjsne207a2d1ce23",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  })
  .then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      displayRecipe(data.response);
    });
  })
  .catch((err) => {
    console.error(err);
  });
};

function displayRecipe(response) {
  for (i = 0; i < response.length; i++) {
    let id = response[i].id;

    let recipeCard = $(`
    <div class="col-sm-4 my-4">
    <div class="card bg-transparent text-center">
      <img class="card-img-top recipeImg" src="https://spoonacular.com/recipeImages/${id}-556x370.jpg">
      <div class="card-body">
        <a class="recipe-title card-text" id="${id}" href="#">${response[i].title}</a>
        <button class="btn seeRecipe text-uppercase" onclick="fetchSingleRecipe(${id})" type="button">View recipe</button>
      </div>
    </div>
    `).appendTo(recipeCardsEl);
  }
}


// displayRecipe(dataSample)

//==================== single recipe ====================//
//TODO: double check href route
$(document).ready(function () {
  $('button[name="recipe-title"]').click(function () {
    let recipeId = this.value;
    location.href = './recipes'
    fetchRecipeDetails(recipeId);
  });
});

const fetchRecipeDetails = (id) => {
  console.log(id);
  console.log('hi');
  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
      id +
      "/information",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d020ffed6amsh9102480cca766bbp115709jsn6f2ff5ea985b",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    }
  ).then(function (response) {
    response.json().then(function (response) {
      let recipe = {};
      recipe.name = response.title;
      recipe.ingredients = [];
      recipe.image = response.image;
      recipe.instructions = response.instructions
    
      let ingredientsArr = response.extendedIngredients;
      for (let i = 0; i < ingredientsArr.length; i++) {
        var ingredient = response.extendedIngredients[i].originalString;
    
        recipe.ingredients.push(ingredient);
      }
      console.log(recipe);
      return recipe;
      }).then(recipe => displaySingleRecipe(recipe))
      .catch((err) => {
        console.error(err);
      });
  });
};

// function parseRecipeRes(response) {
//   let recipe = {};
//   recipe.name = response.title;
//   recipe.ingredients = [];
//   recipe.image = response.image;
//   recipe.instructions = response.instructions

//   let ingredientsArr = response.extendedIngredients;
//   for (let i = 0; i < ingredientsArr.length; i++) {
//     var ingredient = response.extendedIngredients[i].originalString;

//     recipe.ingredients.push(ingredient);
//   }
//   // console.log(recipe);
//   return recipe;
// }

function displaySingleRecipe(recipe) {
    let recipeContainer = $("<div>").appendTo(recipeDetailsEl);
    let recipeName = $('<h2>').text(recipe.name).appendTo(recipeContainer);
    let recipeImg = $("<img>").attr("src", recipe.image).appendTo(recipeContainer);
    let recipeBodyContainer = $('<div>').appendTo(recipeContainer);
    let ingredientsContainer = $('<div>').appendTo(recipeBodyContainer)
    let instructions = $('<div>').text(recipe.instructions).appendTo(recipeBodyContainer)

    for (var i = 0; i < recipe.ingredients.length; i++) {
      let ingredients = $("<p>").text(recipe.ingredients[i]).appendTo(ingredientsContainer)
    }
  }


  