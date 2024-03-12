



async function getDetailPokemon() {
    const numberPokemon = 1
    const url = `https://pokeapi.co/api/v2/pokemon/${numberPokemon}`
    const promise = await fetch(url)
    return await promise.json()
}



(async () => {
    const detailPokemon = await getDetailPokemon()
})()