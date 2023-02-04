
let searchValue;
let searchBoxValue;
let trueLocation;
let pokeData;
let pokeData1;
let pokeData2;
let pokeData3;
let pokeData4;

let logoBtn = document.getElementById('logo').addEventListener('click', () => {
    window.location.reload()
})

let searchBtn = document.querySelector('[data-search-btn]')
let randomBtn = document.getElementById('rndBtn');
let moveBtn = document.getElementById('moveBtn');
let searchBox = document.getElementById('searchBox');
let moveList = document.getElementById('move-list');
let carrot = document.getElementById('carrot')

let pokemonName = document.querySelector('[data-pokemon-name]');
let defaultImg = document.querySelector('[data-default-img]')
let shinyImg = document.querySelector('[data-shiny-img]');
let abilities = document.querySelector('[data-abilities]');
let type = document.querySelector('[data-type]');
let pokeLocation = document.querySelector('[data-poke-location]');

randomBtn.addEventListener('click', () => {
    let rndNum = Math.floor(Math.random() * 649) + 1;
    FetchPokemon(rndNum);
})


searchBox.addEventListener("keypress", function (event) {
    if ((searchBoxValue = document.getElementById('searchBox').value) == "") {
        return
    }
    if (event.key == "Enter") {
        searchBoxValue = document.getElementById('searchBox').value.toLowerCase()
        FetchPokemon(searchBoxValue);
    }
});

let hidden = true;
    moveBtn.addEventListener('click', () => {
        

        if(hidden){
            moveList.classList.remove('hidden');
            carrot.classList.remove('group-hover:rotate-[90deg]');
            carrot.classList.add('rotate-[90deg]');
            hidden = false;
        }else{
            carrot.classList.remove('rotate-[90deg]');
            carrot.classList.add('group-hover:rotate-[90deg]');
            moveList.classList.add('hidden');
            hidden = true;
        }
})

function RenderData() {
    pokeData1 = parsePokeData(pokeData);
    pokeData2 = parseAbilities(pokeData);
    console.log(pokeData1)
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
    type.innerHTML = "";
        pokeData3.forEach(types => {
            let tag = document.createElement('p')
            tag.textContent = types.type
            tag.className = "text-black text-center text-xl first-letter:capitalize"
            type.append(tag)
        })
    
    pokeLocation.textContent = trueLocation;
    
    let moveTag;
    moveList.innerHTML = "";
    //moveList.classList.add('hidden')
    pokeData1.moves.forEach(moves => {
        moveTag = document.createElement('p')
        moveTag.textContent = moves.move.name
        moveTag.className = "text-black text-xl px-4 py-1 first-letter:capitalize bg-white first-letter:capitalize"
        moveList.append(moveTag)
    })

}  

async function FetchPokemon(searchValue) {
    //Call API and save it in json format
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)

    //save the formatted data in a global variable, should be local though
    const data = await res.json();
    pokeData = data

    const res2 = await fetch(pokeData.location_area_encounters)
    const data2 = await res2.json()
    trueLocation = data2
    if(trueLocation[0] == undefined){
        trueLocation = "N/A"
    }else{
    trueLocation = trueLocation[0].location_area.name.replace(/-/g, " ")
    }
    console.log(pokeData)
    RenderData()
}

//function to parse data
function parsePokeData({ moves, name, id, sprites, location_area_encounters}) {

    const {
        front_default: defaultURL,
        front_shiny: shinyURL,
    } = sprites

    return {
        name,
        id,
        moves,
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






