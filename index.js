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
const nav = document.getElementById('navBar')
let breweriesArray;

// Event Listeners

breweryForm.addEventListener('submit', fetchApi)
option.addEventListener('input', updateList)
window.addEventListener('scroll', handleScroll)

// Functions

function fetchApi(event){
    event.preventDefault();
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${brewerySearch.value}&per_page=100`,{
        headers: {
            'Accept': 'applicaiton/json'
        }
    })
    .then(r=> r.json())
    .then(data => {
        breweriesArray = data
        updateList()})

};

function updateList(){
    breweryList.innerText = ''
    const filteredArray = breweriesArray.filter(breweryObj => {
        if(option.value === 'refine'|| option.value === 'All') return true
        if(option.value === breweryObj.brewery_type) return true
    })
    filteredArray.forEach(breweryObj => addList(breweryObj))
};

function addList(brewery){
    let i = document.createElement('li')
    i.id = 'newList'
    i.innerHTML = `<p id="bList"class="${brewery.brewery_type}">${brewery.name}</p><p id="hiddenP" class="${brewery.brewery_type}">${brewery.brewery_type}</p>`
    breweryList.appendChild(i)
    i.addEventListener('click', ()=>{
         displayBrewery(brewery)
    })
};

function displayBrewery(brewery){
    let randomNum = Math.floor(Math.random() * pictures.length);
    // console.log(brewery)
    let j =`<img class="img" src=${pictures[randomNum]} alt="Beer photo" />
    <h3>${brewery.name}</h3>
    <ul id="Information">
      <li>${brewery.brewery_type} Brewery</li>
      <li>${brewery.street} ${brewery.city}, ${brewery.state}</li>
      <li>Call: (${brewery.phone.slice(0,3)}) ${brewery.phone.slice(3,6)}-${brewery.phone.slice(6)}</li>
      <li>
        <a class="website" href="${brewery.website_url}" target="_blank"
          >${brewery.website_url}</a
        >
      </li>
    </ul>`
    oldDiv.innerHTML = j
};

function handleScroll(){
    if(document.documentElement.scrollTop > 20 ){
        nav.style.top = '0'
    } else {
        nav.style.top = '-50px'
    }
};
