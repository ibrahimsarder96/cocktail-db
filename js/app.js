//--toggleSpinner arrow function-------------
const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
}
//--toggleSearchResult arrow function--------------------
 const toggleSearchResult = displayStyle => {
  document.getElementById('toggle-search').style.display = displayStyle;
 }
const searchCocktail = () =>{
  const searchField = document.getElementById('search-field');
  toggleSpinner('block');
  toggleSearchResult('none');
  const searchText = searchField.value;
  searchField.value = '';
  if(searchText === '') {
    alert('please display write something');
  toggleSpinner('none');
  }
  else{
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch (url)
  .then (res => res.json())
  .then(data => displaySearchResult(data.drinks))
  toggleSpinner('none')
  }
}

const displaySearchResult = drinks => {
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  if(!drinks){
    alert('show no more result found')
  }
  drinks.forEach(drink => {
  console.log(drink)
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML= `
   
    <div class="card h-100">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${drink.strAlcoholic}</h5>
          <p class="card-text">${drink.strInstructions.slice(0, 100)}</p>
          <div><button onclick="loadDrinkDetail(${drink.idDrink})" class="col btn btn-warning">Drink Detail</button>
          </div>
        </div>
      </div>
    `
    searchResult.appendChild(div)
  });
  toggleSpinner('none');
  toggleSearchResult('block')
}

const loadDrinkDetail = drinkId => {
  console.log(drinkId)
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
  fetch (url)
  .then(res => res.json())
  .then(data => displayDrinkDetail(data.drinks[0]))
}

const displayDrinkDetail = drink => {
  const  drinkDetails = document.getElementById('drink-details');
  drinkDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Name: ${drink.strAlcoholic}</h5>
        <h5 class="card-title">${drink.strCategory}</h5>
        <h5 class="card-title">${drink.strIngredient3}</h5>
        <p class="card-text">${drink.strInstructions.slice(0, 150)}</p>
        <a href="${drink.strVideo}" class="btn btn-primary">Go somewhere</a>
      </div>
  `;
  drinkDetails.appendChild(div)
}