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
        "x-rapidapi-key": "34dff35736msh55aa38c64ff1987p1a7defjsn975b941ff55a",
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
      <h2 class="mb-3 text-start my-4 mx-4 px-4">${recipe.name}</h2>
      <div class="row mb-5 pt-3 pt-lg-4 pt-xl-5">
      <div class="row justify-content-center"
        <div class="col-12 col-md-6 col-xl-8 justify-content-center">
          <img class="mb-3 text-center justify-content-center" src="${recipe.image}" style="width: 700px; height: 400px"=>
        </div>
        <div class="col-4 justify-content-center py-4 px-4">
          <div class="ingTitle fw-bold my-2 justify-content-center text-center fs-4">
            Ingredients
          </div>
          <div class="container text-left align-content-left py-4 px-4" >
          <div class="ingredients-container row " id="ingredients-container">
            <div class="col-6 text-end" id="ingredients-measurement"></div>
            <div class="col-6 text-start" id="ingredientsList"></div>
          </div>
        </div>
        </div>
        <div class="col-8 justify-content-center py-4 px-4">
          <div class="directionTitle fw-bold my-2 text-start fs-4">
            Directions
          </div>
          <div class="py-4 px-4">
              <p>${recipe.instructions}</p>
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
// document.querySelector('#add-list-btn').addEventListener('click', shoppingListHandler);