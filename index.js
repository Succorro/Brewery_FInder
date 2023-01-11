//Declared Variables

// const remove = (select) => document.querySelectorAll(select).forEach(e => e.remove());
const option = document.getElementById('dropDown')
const breweryForm = document.getElementById('form')
const breweryList = document.getElementById('list')
const brewerySearch = document.getElementById('search')
let oldDiv = document.getElementById('rightPanel')
let pictures = [
    "/Images/Beer_On_Mountain.jpg",
    "/Images/Beer_On_The_Beach.jpg",
    "/Images/Cheers_Mug.jpg",
    "/Images/Cheers.jpg",
    "/Images/fish_tacos.jpg",
    "/Images/Full_Round_Glass.jpg",
    "/Images/Holding_Beer.jpg",
    "/Images/Mug_Beer.jpg",
    "/Images/pouring_mug.jpg",
    "/Images/PouringBeer.jpg",
    "/Images/Round_Glass_On_Table.jpg",];


// Event Listeners

option.addEventListener('input', fetchApi)
breweryForm.addEventListener('submit', fetchApi)


// Functions

function fetchApi(event){
    event.preventDefault();
    // console.log('1st')
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${brewerySearch.value}&per_page=100`,{
        headers: {
            'Accept': 'applicaiton/json'
        }
    })
    .then(r=> r.json())
    .then(data => updateList(data))
};

function updateList(breweries){
    // console.log('2nd')
    removeChildren(breweryList);
    if(option.value === 'refine'|| option.value === 'All'){
        breweries.forEach(b=>addList(b))
    } else if (option.value === 'micro'){
        breweries.forEach(b=>addMicro(b))
    } else if (option.value === 'brewpub'){
        breweries.forEach(b=>addBrewPub(b))
    }else if (option.value === 'nano'){
        breweries.forEach(b=>addNano(b))
    }else if (option.value === 'regional'){
        breweries.forEach(b=>addRegional(b))
    }
};

function removeChildren(data){
    let child = data.lastElementChild
    while (child){
        data.removeChild(child)
        child = data.lastElementChild
    }
};

function addList(breweries){
    let i = document.createElement('li')
    i.id = 'newList'
    i.innerHTML = `<p id="bList"class="${breweries.brewery_type}">${breweries.name}</p><p id="hiddenP" class="${breweries.brewery_type}">${breweries.brewery_type}</p>`
    breweryList.appendChild(i)
    // console.log(breweries.name)
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

function addMicro(breweries){
    if(breweries.brewery_type === 'micro'){
        let i = document.createElement('li')
        i.id = 'newList'
        i.innerHTML = `<p id="bList"class="${breweries.brewery_type}">${breweries.name}</p><p id="hiddenP" class="${breweries.brewery_type}">${breweries.brewery_type}</p>`
        breweryList.appendChild(i)
        i.addEventListener('click', ()=>{
            fetch (`https://api.openbrewerydb.org/breweries?by_name=${breweries.name}`,{
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(r => r.json())
                .then(data => displayBrewery(data))
        })
    }
};

function addBrewPub(breweries){
    if(breweries.brewery_type === 'brewpub'){
        let i = document.createElement('li')
        i.id = 'newList'
        i.innerHTML = `<p id="bList"class="${breweries.brewery_type}">${breweries.name}</p><p id="hiddenP" class="${breweries.brewery_type}">${breweries.brewery_type}</p>`
        breweryList.appendChild(i)
        i.addEventListener('click', ()=>{
            fetch (`https://api.openbrewerydb.org/breweries?by_name=${breweries.name}`,{
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(r => r.json())
                .then(data => displayBrewery(data))
        })
    }
};

function addNano(breweries){
    if(breweries.brewery_type === 'nano'){
        let i = document.createElement('li')
        i.id = 'newList'
        i.innerHTML = `<p id="bList"class="${breweries.brewery_type}">${breweries.name}</p><p id="hiddenP" class="${breweries.brewery_type}">${breweries.brewery_type}</p>`
        breweryList.appendChild(i)
        i.addEventListener('click', ()=>{
            fetch (`https://api.openbrewerydb.org/breweries?by_name=${breweries.name}`,{
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(r => r.json())
                .then(data => displayBrewery(data))
        })
    }
};

function addRegional(breweries){
    if(breweries.brewery_type === 'regional'){
        let i = document.createElement('li')
        i.id = 'newList'
        i.innerHTML = `<p id="bList"class="${breweries.brewery_type}">${breweries.name}</p><p id="hiddenP" class="${breweries.brewery_type}">${breweries.brewery_type}</p>`
        breweryList.appendChild(i)
        i.addEventListener('click', ()=>{
            fetch (`https://api.openbrewerydb.org/breweries?by_name=${breweries.name}`,{
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(r => r.json())
                .then(data => displayBrewery(data))
        })
    }
};

function displayBrewery(breweries){
    let randomNum = Math.floor(Math.random() * pictures.length);

    let j =`<img class="img" src=${pictures[randomNum]} alt="Beer photo" />
    <h3>${breweries[0].name}</h3>
    <ul id="Information">
      <li>${breweries[0].brewery_type} Brewery</li>
      <li>${breweries[0].street} ${breweries[0].city}, ${breweries[0].state}</li>
      <li>Call: (${breweries[0].phone.slice(0,3)}) ${breweries[0].phone.slice(3,6)}-${breweries[0].phone.slice(6)}</li>
      <li>
        <a class="website" href="${breweries[0].website_url}" target="_blank"
          >${breweries[0].website_url}</a
        >
      </li>
    </ul>`
    oldDiv.innerHTML = j
    // console.log(oldDiv)
}

