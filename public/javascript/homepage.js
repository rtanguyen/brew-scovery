
let userInput;
let recipeCardsEl = document.querySelector('#recipeContainer');
const categories = document.querySelectorAll(".btn-group > button.btn");
let dataSample = [
  {
      "id": 482788,
      "title": "Garlicky Pasta with Swiss Chard and Beans",
      "readyInMinutes": 35,
      "servings": 4,
      "sourceUrl": "http://thelemonbowl.com/2012/08/garlicky-pasta-with-swiss-chard-and-beans-sundaysupper.html",
      "openLicense": 0,
      "image": "Garlicky-Pasta-with-Swiss-Chard-and-Beans-482788.jpg"
  },
  {
      "id": 729352,
      "title": "Italian Sausage Stew with White Beans and Kale",
      "readyInMinutes": 20,
      "servings": 4,
      "sourceUrl": "http://www.rachelcooks.com/2016/04/01/italian-sausage-stew-white-beans-kale/",
      "openLicense": 0,
      "image": "italian-sausage-stew-with-white-beans-and-kale-729352.jpg"
  },
  {
      "id": 695646,
      "title": "Steak & Potato Kebabs with Creamy Cilantro Sauce for Two",
      "readyInMinutes": 40,
      "servings": 2,
      "sourceUrl": "http://www.eatingwell.com/recipes/steak_potato_kebabs_with_creamy_cilantro_sauce_for_two.html",
      "openLicense": 0,
      "image": "steak-potato-kebabs-with-creamy-cilantro-sauce-for-two-695646.jpg"
  },
  {
      "id": 510624,
      "title": "Lemon Pesto Zucchini Sandwich",
      "readyInMinutes": 27,
      "servings": 1,
      "sourceUrl": "http://www.peanutbutterandpeppers.com/2013/05/10/lemon-pesto-zucchini-sandwich/",
      "openLicense": 0,
      "image": "Lemon-Pesto-Zucchini-Sandwich-510624.jpg"
  }
]



  //grab value from categories
  for(var i=0; i<categories.length; i++){
    categories[i].addEventListener("click", function(){
      userInput = this.value;
      // recipeFetch(userInput)
    });
}

//grab value from search
$('#search-form').on('click', function() {
  userInput =  document.querySelector('#recipe-search').value.trim()
  console.log(userInput)
})


//TODO: go to single-recipe page and fetch recipe based on recipe id(<a> id)
// $('.recipe-title').on('click', function() {
//   console.log('hiiii');
//   let recipeId = $(this).getAttribute('id')
//   console.log(recipeId);
// })
function displaySingleRecipe () {
  $('.recipe-title').on('click', $(document).ready(function() {
console.log($(this));
let recipeId = $(this).attr('id')
console.log(recipeId)
}))
}
// document.querySelector('.recipe-title').addEventListener('click', displaySingleRecipe)

//pick cocktail based on user input, grab drink ID
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

function displayRecipe(dataSample) {
  for (i = 0; i<dataSample.length; i++) {
    let id = dataSample[i].id

    let recipeContainer = $("<div>").addClass("card bg-transparent text-center").appendTo(recipeCardsEl);
    let cardImg = $('<img>').addClass('card-img-top recipeImg').attr("src", "https://spoonacular.com/recipeImages/" + id + "-556x370.jpg").appendTo(recipeContainer);
    let cardBody = $("<div>").addClass("card-body").appendTo(recipeContainer);
    let recipeTitle = $("<a>").addClass("card-title recipe-title").text(dataSample[i].title).attr("href", '/single-recipe').appendTo(cardBody);

  }
}

displayRecipe(dataSample)
