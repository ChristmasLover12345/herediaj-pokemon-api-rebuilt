export async function pokemonFetch(userSearch: string | number)
{
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    const data = await promise.json();
    
    return data;
}

