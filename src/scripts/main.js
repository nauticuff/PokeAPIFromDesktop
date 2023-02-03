
let searchValue;
let pokeData;
let pokeData1;
let pokeData2;
let location2;
let location3;

let searchBtn = document.querySelector('[data-search-btn]')
let randomBtn = document.getElementById('rndBtn')

searchBtn.addEventListener('click', () => {
    searchValue = document.getElementById('searchValue').value
    FetchPokemon(searchValue)
})

randomBtn.addEventListener('click', () => {
    let rndNum = Math.floor(Math.random() * 649) + 1
    FetchPokemon(rndNum);
}) 


//OLD WAY
// function FetchPokemon(searchValue){
//     fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
//     .then(response => response.json())
//     .then(data => {
//         pokeData = parsePokeData(data)
//     }).then( () => {
//         console.log(pokeData)
//     })
// }

async function FetchPokemon(searchValue) {
    //Call API and save it in json format
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)

    //save the formatted data in a global variable, should be local though
    pokeData = await res.json();
    console.log("ALL DATA BELOW")
    console.log(pokeData)

    //parse the data for what is needed
    console.log("PARSED DATA BELOW")
    pokeData1 = parsePokeData(pokeData)
    pokeData2 = parseAbilities(pokeData)
    //parseLocation()
    
    //log the parsed data
    console.log(pokeData1)
    console.log(pokeData2)
    // setTimeout(() => {
    //     console.log(location2)
    // }, 100);
    
  }

//function to parse data
function parsePokeData({moves, name, id}){

    const {
        name: moveName,
    } = moves[0].move

    return {
        name,
        id,
        moveName,
    }
}

function parseAbilities({abilities}){
    return abilities.map((index) => {
        return {
            abilityName: index.ability.name,
        }
    }) 
}

// async function parseLocation(){
//     // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)

//     // //save the formatted data in a global variable, should be local though
//     // pokeData = await res.json();

//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}/encounters`)
//     location2 = await res.json();
//     console.log(location2)
//     location2 = location2[0].location_area.name

//     // .then(response => response.json())
//     // .then(data => {
//     //     location2 = data[0].location_area.name;
//     // })
//     //location2 = location2.
//     //console.log(location2)
    
// }


