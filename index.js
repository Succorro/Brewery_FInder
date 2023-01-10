//Declared Variables
const option = document.getElementById('dropDown')
const breweryForm = document.getElementById('form')
const breweryList = document.getElementById('list')
const brewerySearch = document.getElementById('search')
let oldDiv = document.getElementById('rightPanel')
let pictures = [
    "/Images/PouringBeer.jpg",
    "/Images/drink_on_counter.jpg",
    "/Images/fish_tacos.jpg",
    "/Images/full_glass.jpg",
    "/Images/pouring_mug.jpg",
    "/Images/tall_glass.jpg"];

// Event Listeners
option.addEventListener('input', handleSelect)
breweryForm.addEventListener('submit', fetchApi)

// Functions

function fetchApi(event){
    event.preventDefault();
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${brewerySearch.value}&per_page=100`,{
        headers: {
            'Accept': 'applicaiton/json'
        }
    })
    .then(r=> r.json())
    .then(data => updateList(data))
};

function updateList(breweries){
    removeChildren(breweryList);
    breweries.forEach(b=>addList(b))
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

function handleSelect(){
    // let value = document.getElementById('hiddenP')
    const remove = (select) => document.querySelectorAll(select).forEach(e => e.remove());
    if(option.value === 'micro'){
        remove('.brewpub');
        remove('.regional')
        remove('.nano')
        remove('.large')
        remove('.proprietor')
        remove('.contract')
    }else if (option.value === 'brewpub'){
        remove('.micro');
        remove('regional');
        remove('.nano')
        remove('.large')
        remove('.proprietor')
        remove('.contract')
    }else if (option.value === 'regional'){
        remove('.micro');
        remove('.brewpub')
        remove('.nano')
        remove('.large')
        remove('.proprietor')
        remove('.contract')
    }else if (option.value === 'nano'){
        remove('.micro')
        remove('.brewpub')
        remove('.regional')
        remove('.large')
        remove('.proprietor')
        remove('.contract')
    } else if (option.value === 'large'){
        remove('.micro')
        remove('.brewpub')
        remove('.regional')
        remove('.nano')
        remove('.proprietor')
        remove('.contract')
    } 
 }

function displayBrewery(breweries){
    let randomNum = Math.floor(Math.random() * pictures.length);

    let j =`<img class="img" src=${pictures[randomNum]} alt="Beer being poured" />
    <h3>${breweries[0].name}</h3>
    <ul id="Information">
      <li>${breweries[0].brewery_type} Brewery</li>
      <li>${breweries[0].street} ${breweries[0].city}, ${breweries[0].state}</li>
      <li>Call: (${breweries[0].phone.slice(0,3)}) ${breweries[0].phone.slice(3,6)}-${breweries[0].phone.slice(6)}</li>
      <li>
        <a href="${breweries[0].website_url}" target="_blank"
          >Website</a
        >
      </li>
    </ul>`
    oldDiv.innerHTML = j
    // console.log(oldDiv)
}

