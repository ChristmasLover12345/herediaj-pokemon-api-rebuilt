async function pokemonFetch(userSearch: string)
{
    let promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    let data = await promise.json();
    
    return data;
}