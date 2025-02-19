let recipeCardsEl = document.querySelector('#recipeContainer');
const categories = document.querySelectorAll(".btn-group > button.btn");
// let recipeId;
// require('dotenv').config();

// const APIKey = process.env.API_KEY

// $(document).ready(function (event) {
//   recipeFetch('miso')

// })

//==================== recipe cards on homepage ====================//
//grab value from categories
  for(var i=0; i<categories.length; i++){
    categories[i].addEventListener("click", function(){

      console.log('hi');
     let userInput = this.value;
      console.log(userInput);
      recipeFetch(userInput)
    });
}

//grab value from search
$('#search-form').on('click', function() {
 let userInput =  document.querySelector('#recipe-search').value.trim()
  recipeFetch(userInput)
})

var recipeFetch = function (input) {
  $('#recipeContainer').empty();
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + input + "&number=15", {
    method: "GET",
    headers: {

      "x-rapidapi-key": "34dff35736msh55aa38c64ff1987p1a7defjsn975b941ff55a",
      // "x-rapidapi-key": APIKey,
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",

    },
  })
  .then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      displayRecipe(data.results);
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
    <div class="col-sm-4 my-4 d-flex justify-content-center">
    <div class="card" style="width: 22rem;" id="recipeContainer">
      <img class="card-img-top recipeImg img-fluid" src="https://spoonacular.com/recipeImages/${id}-556x370.jpg" alt="recipeImage" >
      <div class="card-body text-center">
        <p class="recipe-title card-text fs-3" id="${id}" href="#">${response[i].title}</p>
        <button class="btn seeRecipe text-uppercase recipebutton" id="${id}" href="#" type="button" onclick="fetchSingleRecipe(${id})"><span>View recipe</span></button>
      </div>
    </div>
    `).appendTo(recipeCardsEl);
  }
}


// displayRecipe(dataSample)

//==================== single recipe ====================//
// const fetchSingleRecipe = id => {
//   console.log(id);

//   fetch("/recipe/" + id, {
//     headers : { 
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//      }
//   })
//   .then((response) => {response.json()})
//   .then((messages) => {console.log("messages");});
// }

function fetchSingleRecipe(id_) {
      console.log(id_);
      fetch('/recipe/' + id_)
        .then(function(response) {
          console.log(response);
          location.assign(response.url)
        }) 
    }


    // .then((function(response) {
    //   console.log(response);
    // })
//     .then(response => response.json())
// .then((body) => {
//         console.log(body);
// })}


// method: 'GET',
// body: JSON.stringify({
//   recipeId
// }),
// headers: {
//     'Content-Type': 'application/json'
// }
// })
// .then(response => { console.log(response)
// })
// .then(res => {
// return res.json()
// })
// };


  // const fetchSingleRecipe = id => {
  //   console.log(id);
  //   fetch('/recipe/' + id)
  //     .then(function(response) {
  //       console.log(response);
  //     }) 
  // }

//DISPLAY ON LOAD
let initialData = [
  {
    "id": 23423,
    "title": "Miso-Glazed Eggplant (Nasu Miso)",
    "readyInMinutes": 45,
    "servings": 4,
    "sourceUrl": "http://www.myrecipes.com/recipe/miso-glazed-eggplant-nasu-miso-10000001916204/",
    "openLicense": 0,
    "image": "miso-glazed-eggplant-nasu-miso-23423.jpg"
},
{
  "id":580771,
  "title":"Roasted Brussels Sprouts and Crispy Baked Tofu with Honey-Sesame Glaze",
  "readyInMinutes":50,
  "servings":4,
  "sourceUrl":"http://cookieandkate.com/2014/,roasted-brussels-sprouts-and-crispy-baked-tofu-with-honey-sesame-glaze/",
  "openLicense":0,
  "image":"Roasted-Brussels-Sprouts-and-Crispy-Baked-Tofu-with-Honey-Sesame-Glaze-580771.jpg"
  },
{
  "id": 603172,
  "title": "Healthy Coconut Cream Pie Overnight Dessert Oats (sugar free, gluten free, vegan)",
  "readyInMinutes": 15,
  "servings": 3,
  "sourceUrl": "http://dessertswithbenefits.com/healthy-coconut-cream-pie-overnight-dessert-oats/",
  "openLicense": 0,
  "image": "Healthy-Coconut-Cream-Pie-Overnight-Dessert-Oats-(sugar-free--gluten-free--vegan)-603172.jpg"
},
{
  "id":695463,
  "title":"Garlic Roasted Salmon & Brussels Sprouts",
  "readyInMinutes":45,
  "servings":6,
  "sourceUrl":"http://www.eatingwell.com/recipes/salmon_brussels_sprouts.html",
  "openLicense":0,
  "image":"garlic-roasted-salmon-brussels-sprouts-695463.jpg"
},
{
  "id": 1152703,
  "title": "Vegan Chocolate Chia Pudding",
  "readyInMinutes": 15,
  "servings": 4,
  "sourceUrl": "https://www.bluediamond.com/recipes/overnight-chocolate-chia-seed-pudding",
  "openLicense": 0,
  "image": "vegan-chocolate-chia-pudding-1152703.jpg"
},
{
  "id": 222482,
  "title": "Roasted vegetable & feta tostada",
  "readyInMinutes": 30,
  "servings": 2,
  "sourceUrl": "https://www.bbcgoodfood.com/recipes/1658642/roasted-vegetable-and-feta-tostada",
  "openLicense": 0,
  "image": "Roasted-vegetable---feta-tostada-222482.jpg"
},
{
  "id":624358,
  "title":"Baked Spaghetti",
  "readyInMinutes":50,
  "servings":12,
  "sourceUrl":"http://www.sixsistersstuff.com/2011/08/baked-spaghetti.html",
  "openLicense":0,
  "image":"Baked-Spaghetti-624358.jpg"
  },
{
  "id": 1445969,
  "title": "Asparagus Stir Fry",
  "readyInMinutes": 15,
  "servings": 2,
  "sourceUrl": "https://www.foodfaithfitness.com/asparagus-stir-fry/",
  "openLicense": 0,
  "image": "asparagus-stir-fry-1445969.jpg"
},
{
  "id": 1452053,
  "title": "Green Shakshuka",
  "readyInMinutes": 135,
  "servings": 4,
  "sourceUrl": "https://lifemadesweeter.com/green-shakshuka/",
  "openLicense": 0,
  "image": "green-shakshuka-1452053.jpg"
},
{
  "id":1118357,
  "title":"Turkish Chickpea Burgers",
  "readyInMinutes":78,
  "servings":2,
  "sourceUrl": "https://ethnicspoon.com/tukish-chickpea-burgers/",
  "openLicense": 0,
  "image": "turkish-chickpea-burgers-1118357.jpg",
  },
  {
    "id":718981,
    "title":"Cheeseburger Gnocchi",
    "readyInMinutes":45,
    "servings":4,
    "sourceUrl":"http://www.kevinandamanda.com/recipes/dinner/cheeseburger-gnocchi.html",
    "openLicense":0,
    "image":"cheeseburger-gnocchi-718981.jpg"
    },
    {
      "id":990650,
      "title":"Lemon Plank-Smoked Salmon",
      "readyInMinutes":25,
      "servings":4,
      "sourceUrl":"http://www.littlebroken.com/2015/06/14/lemon-plank-smoked-salmon/",
      "openLicense":0,
      "image":"lemon-plank-smoked-salmon-990650.jpg"
      }
]
displayRecipe(initialData);


