const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const widowDetail = document.getElementById('windowDetail')

const maxRecords = 151
const limit = 20
let offset = 0




function loadPokemonItems(offset, limit) {

    function convertPokemonToLi(pokemon) {
        return `
        <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    
    `
    }

    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            pokemonList.innerHTML += pokemons
                .map(convertPokemonToLi)
                .join('')
        })

}



loadPokemonItems(offset, limit)

function loadPokemonDetails(offset, limit) {

    function convertPokemon(pokemon) {

        
        return `
                <div class="closeBtn" onclick="closeDetail()">x</div>
                <div class="basic-detail">
                    <span>Name</span>
                    <span>${pokemon.number}</span>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="">

                </div>
                <div class="details-window">
                    <h1>Detalhes do Pokémon</h1>
                    <p><strong>Espécie:</strong> ${pokemon.number}</p>
                    <p><strong>Altura:</strong> ${pokemon.height}</p>
                    <p><strong>Peso:</strong> ${pokemon.weight}</p>
                    <p><strong>Habilidades:</strong> ${pokemon.abilities}</p>
                    <p><strong>HP:</strong> ${pokemon.hp}</p>
                    <p><strong>Ataque:</strong> ${pokemon.attack}</p>
                    <p><strong>Defesa:</strong> ${pokemon.defense}</p>
                    <p><strong>Velocidade:</strong> ${pokemon.speed}</p>
                    <p><strong>Total:</strong> ${pokemon.total}</p>
                </div>
    `
    }
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            widowDetail.innerHTML = pokemons
                .map(convertPokemon)
                
        })
        

}

loadPokemonDetails(5, 1)







loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit 
    
    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = qtdRecordNextPage - maxRecords
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItems(offset, limit)
    }
    


})

const backGround = document.getElementById('backGround')

/*function openDetail(){
    backGround.classList.add('bgDisplay')
}*/

function closeDetail(){
    backGround.classList.remove('bgDisplay')
}

