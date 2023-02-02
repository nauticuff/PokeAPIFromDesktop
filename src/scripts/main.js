let searchValue;
let pokeData;
let searchBtn = document.querySelector('[data-search-btn]')

searchBtn.addEventListener('click', () => {
    searchValue = document.getElementById('searchValue').value
    FetchPokemon(searchValue)
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

    //parse the data for what is needed
    //pokeData = parsePokeData(pokeData)
    pokeData = parseAbilities(pokeData)
    

    //log the parsed data
    console.log(pokeData)
  }

//function to parse data
function parsePokeData({moves, name, weight}){

    // const {
    //     name: pokeAbility,
    // } = abilities[0].ability

    //const pokeAbility = abilities[0].ability.name (same as code above)

    const {
        name: moveName,
    } = moves[0].move

    return {
        name,
        //pokeAbility,
        moveName,
        weight,
    }
}

function parseAbilities({abilities}){
    return abilities.map((index) => {
        return {
            abilityName: index.ability.name,
        }
    }) 
}