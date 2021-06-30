let recipeEl = document.querySelector('#recipeDetailsContainer');
let ingredientName;


//======= fetch/display recipe ======= //
$(window).ready(function (event) {


  $('#recipeDetailsContainer').empty();
  getRecipe(recipeId);
  
})

const getRecipe = (recipeId) => {
  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
    recipeId + "/information",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "30f04bca87mshb6f84916c7e0709p18c5ebjsne207a2d1ce23",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    }
  ).then(function (response) {
    response.json().then(function (data) {
        console.log('hi');
        recipe = parseRecipeRes(data);
        displaySingleRecipe(recipe)
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

function parseRecipeRes(response) {
  let recipe = {};
  recipe.name = response.title;
  recipe.ingredients = [];
  recipe.image = response.image;
  recipe.instructions = response.instructions
  recipe.ingredientsName = []
  recipe.measurement = []

  // let ingredientsArr = response.extendedIngredients;
  // for (let i = 0; i < ingredientsArr.length; i++) {
  //   var ingredient = response.extendedIngredients[i].originalString;

  //   recipe.ingredients.push(ingredient);
  // }
  let ingredientsArr = response.extendedIngredients;
  for (let i = 0; i < ingredientsArr.length; i++) {
    var measurement = response.extendedIngredients[i].measures.us.amount + " " + response.extendedIngredients[i].measures.us.unitShort;
    var ingredientName = response.extendedIngredients[i].name
    var ingredient = measurement + " " + ingredientName;
  //replace double spaces if fields are blank
    measurement = measurement.replace(/ +(?= )/g,'');
    recipe.measurement.push(measurement);
    recipe.ingredientsName.push(ingredientName);
    recipe.ingredients.push(ingredient);
  }
  console.log(recipe);
  return recipe;
}

function displaySingleRecipe(recipe) {
  console.log(recipe.ingredients);

  let singleRecipeDetails = $(`
      <div class="row mb-5 ">
      <h2 class="mb-3 text-start">${recipe.name}</h2>
      <img class="mb-3 text-center" src="${recipe.image}" style="width: 800px">
      <div>
      <div><p>${recipe.instructions}</p></div>
      </div>
    </div>
    <div class="container text-center align-content-center mb-5" >
      <div class="ingredients-container row justify-content-center" id="ingredients-container">
      <div class="col-2" id="ingredients-measurement"></div>
      <div class="col-4" id="ingredientsList"></div>

      </div>
      </div>
      </div>

      `).appendTo(recipeEl)



    // let recipeContainer = $("<div>").appendTo(recipeEl);
    // let recipeName = $('<h2>').text(recipe.name).appendTo(recipeContainer);
    // let recipeImg = $("<img>").attr("src", recipe.image).appendTo(recipeContainer);
    // let recipeBodyContainer = $('<div>').appendTo(recipeContainer);
    // let ingredientsContainer = $('<div>').addClass('ingredients-container row').appendTo(recipeContainer)
    // let measurements = $('<div>').addClass('col-1').appendTo(ingredientsContainer)
    // // let space = $('<div>').addClass('col-1').appendTo(ingredientsContainer)
    // let ingredientsEl = $('<div>').addClass('col-2').appendTo(ingredientsContainer).attr('id', 'ingredientsList')

    // let instructions = $('<div>').text(recipe.instructions).appendTo(recipeBodyContainer)

    for (var i = 0; i < recipe.ingredients.length; i++) {
      let measurement = $("<p>").text(recipe.measurement[i]).appendTo($('#ingredients-measurement'))
      // $('<p>').text('...........').appendTo(space)
      // let ingredientName = $("<p>").text(recipe.ingredientsName[i]).appendTo($('.ingredientsList'))
}

for (var i = 0; i < recipe.ingredients.length; i++) {
  let ingredientName = $("<p>").text(recipe.ingredientsName[i]).appendTo($('#ingredientsList'))
}
}
    
//======= add review ======= //
async function reviewFormHandler(event) {
  event.preventDefault();

  const review_text = document.querySelector('textarea[name="review-body"]').value.trim();
  const api_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];

  if(review_text) {
      const response = await fetch('/api/reviews', {
          method: 'POST',
          body: JSON.stringify({
              review_text,
              api_id
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if(response.ok) {
          document.location.reload();
      } else {
          alert(response.statusText);
      }
  }
}

document.querySelector('.review-form').addEventListener('submit', reviewFormHandler);


//======= add to shopping list ======= //
async function shoppingListHandler(event) {
  event.preventDefault();
  
  let ingredients_name = [];
  const ingredientsArr = document.querySelector('#ingredientsList').children;
  console.log(ingredientsArr);
  let listId = session.user_id
  console.log(listId);
  for (var i=0; i < ingredientsArr.length; i++) {
      let ingredient = ingredientsArr[i].innerText;
      ingredients_name.push(ingredient);
    }
    console.log(ingredients_name);
  // //TODO: update path?
  console.log(ingredients_name);
  const response = await fetch(`/api/list/${listId}`, {
      method: 'PUT',
      body: JSON.stringify({
          ingredients_name,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

      if(response.ok) {
          document.location.reload();
      } else {
          alert(response.statusText);
      }
}
document.querySelector('#add-list-btn').addEventListener('click', shoppingListHandler);