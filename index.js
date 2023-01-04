const breweryForm = document.getElementById('form')
const breweryList = document.getElementById('list')
const brewerySearch = document.getElementById('search')
let oldDiv = document.getElementById('displayDiv')

breweryForm.addEventListener('submit', fetchApi)

function fetchApi(event){
    event.preventDefault();
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${brewerySearch.value}&per_page=100`,{
        headers: {
            'Accept': 'applicaiton/json'
        }
    })
    .then(r=> r.json())
    .then(data => {
        data.forEach(data=> createList(data))
    })
};

function createList(breweries){
    console.log(breweries)
    let i = document.createElement('li')
    i.id = 'newList'
    i.innerHTML = `<p>${breweries.name} </p>`
    breweryList.appendChild(i)
    console.log(breweries.name)
    i.addEventListener('click', ()=>{
        fetch (`https://api.openbrewerydb.org/breweries?by_name=${breweries.name}`,{
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => displayBrewery(data))
    })
};

function displayBrewery(breweries){
    // oldDiv.
    console.log(breweries)
    // let j = document.createElement('li')
    let j =`<img src="/Images/PouringBeer.jpg" alt="Beer being poured" />
    <h3>${breweries[0].name}</h3>
    <ul id="Information">
      <li>${breweries[0].brewery_type} Brewery</li>
      <li>${breweries[0].street} ${breweries[0].city}, ${breweries[0].state}</li>
      <li>
        <a href="${breweries[0].website_url}"
          >Website</a
        >
      </li>
    </ul>`
    oldDiv.innerHTML = j
    console.log(oldDiv)
}

