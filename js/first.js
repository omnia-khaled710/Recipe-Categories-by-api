let searchBtn= document.getElementById('searchBtn');
let searchInput =document.getElementById('searchInput');
let searchResult=document.getElementById('searchResult');
let recipeDetailsDiv= document.getElementById('recipeDetails');

let allRecipes=[];
 async function getRecipe(term)
 {
      let apiRecipes = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`)
          apiRecipes= await apiRecipes.json();
          allRecipes = apiRecipes.recipes
          displayAllRecipes();

}
searchBtn.addEventListener('click',function(){
   getRecipe(searchInput.value)
})
function displayAllRecipes()
{
    
       let data =``;
      
       for(let i=0 ; i<allRecipes.length ; i++)
       {
        let myId = "'"+allRecipes[i].recipe_id+"'";
        data +=       
               `<div  onclick="getRecipeDetails(${myId})" class="col-md-4">
                     <div class="recipe" >
                        <img src="${allRecipes[i].image_url}" class="w-100  alt="">
                        <h5 class="color-mine font-weight-bolder py-2">${allRecipes[i].title}</h5>
                        <p>by ${allRecipes[i].publisher}</p>
                     </div>                       
               </div>`
       }
       searchResult.innerHTML=data;
    }
    
async function getRecipeDetails(id){
    let recipeDetails;
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
       apiResponse = await apiResponse.json();
       recipeDetails=apiResponse.recipe;
       console.log(recipeDetails)
       showRecipeDetails(recipeDetails)
}

function showRecipeDetails(recipeDetails){
    let data = ` <h4 class="color-mine py-2 font-weight-bolder text-center">${recipeDetails.title}</h4>
    <img src="${recipeDetails.image_url}" class="w-100">
    <p class="p-2">${recipeDetails.publisher}</p>
    <ul>`;
    for(let i=0 ; i<recipeDetails.ingredients.length ; i++)
    {
data += ` <li class="font-weight-bolder  py-2">${recipeDetails.ingredients[i]} </li>`
    }
       
   
    data+=`</ul>`;
    recipeDetailsDiv.innerHTML = data;

}
