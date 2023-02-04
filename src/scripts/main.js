
let searchValue;
let searchBoxValue;
let trueLocation;
let pokeData;
let pokeData1;
let pokeData2;
let pokeData3;
let pokeData4;

let searchBtn = document.querySelector('[data-search-btn]')
let randomBtn = document.getElementById('rndBtn')
let searchBox = document.getElementById('searchBox')

let pokemonName = document.querySelector('[data-pokemon-name]');
let defaultImg = document.querySelector('[data-default-img]')
let shinyImg = document.querySelector('[data-shiny-img]');
let abilities = document.querySelector('[data-abilities]');
let type = document.querySelector('[data-type]');
let pokeLocation = document.querySelector('[data-poke-location]');

randomBtn.addEventListener('click', () => {
    let rndNum = Math.floor(Math.random() * 649) + 1
    FetchPokemon(rndNum);
})

searchBox.addEventListener("keypress", function (event) {
    if ((searchBoxValue = document.getElementById('searchBox').value) == "") {
        return
    }
    if (event.key == "Enter") {
        searchBoxValue = document.getElementById('searchBox').value
        FetchPokemon(searchBoxValue);
    }

});

function RenderData() {
    pokeData1 = parsePokeData(pokeData);
    pokeData2 = parseAbilities(pokeData);
    pokeData3 = parseTypes(pokeData);
    
    pokemonName.textContent = pokeData1.name;
    defaultImg.src = pokeData1.defaultURL;
    shinyImg.src = pokeData1.shinyURL;

    abilities.innerHTML = "";
    pokeData2.forEach(ability => {
        let tag = document.createElement('p')
        tag.textContent = ability.abilityName
        tag.className = "text-black text-center text-xl first-letter:capitalize"
        abilities.append(tag)
    })
    type.innerHTML = "",
        pokeData3.forEach(types => {
            let tag = document.createElement('p')
            tag.textContent = types.type
            tag.className = "text-black text-center text-xl first-letter:capitalize"
            type.append(tag)
        })
    
    pokeLocation.textContent = trueLocation;
    

}  

async function FetchPokemon(searchValue) {
    //Call API and save it in json format
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)

    //save the formatted data in a global variable, should be local though
    const data = await res.json();
    pokeData = data
    FetchLocation(pokeData);
    RenderData()
    

}

//function to parse data
function parsePokeData({ moves, name, id, sprites, location_area_encounters}) {

    const {
        name: moveName,
    } = moves[0].move

    const {
        front_default: defaultURL,
        front_shiny: shinyURL,
    } = sprites

    return {
        name,
        id,
        moveName,
        defaultURL,
        shinyURL,
        location_area_encounters
    }
}

function parseAbilities({ abilities }) {
    return abilities.map((index) => {
        return {
            abilityName: index.ability.name,
        }
    })
}

function parseTypes({ types }) {
    return types.map((index) => {
        return {
            type: index.type.name,
        }
    })
}



function FetchLocation(pokeData){
    fetch(pokeData.location_area_encounters)
        .then(response => response.json())
        .then(data => {
            trueLocation = data[0].location_area.name.replace(/-/g, " ")
        })
    }




