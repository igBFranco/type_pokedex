const fetchPokemon = () => {
    const getPokemonUrl = (id: number) => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonPromises = [];

    for (let i=1; i<= 200; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map((typeInfo: { type: { name: any; }; }) => typeInfo.type.name)


                accumulator += `
                    <li class="card-${types[0]}">
                        <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png"/>
                        <h2 class="card-title">${pokemon.id} ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>
                `
                return accumulator;
            }, '')

            const ul = document.getElementById('pokemons');
            ul!.innerHTML = lisPokemons;
            
            console.log(ul);
            
        })
}

fetchPokemon();