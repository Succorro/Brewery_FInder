const breweryForm = document.getElementById('form')
const breweryList = document.getElementById('list')
const brewerySearch = document.getElementById('search')
const oldDiv = document.getElementById('displayDiv')

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
    console.log(breweries)
    let j = document.createElement('li')
    j.id= 'display'
    j.innerHTML = `<p>${breweries[0].name}</p>`
    oldDiv.appendChild(j)
}

