function getFav()
{
    let favoriteData = localStorage.getItem('Favorites');
    if (favoriteData == null)
    {return [];}
    return JSON.parse(favoriteData);
}

function saveFav(mon: string)
{
    let pokeArr = getFav()
    if (!pokeArr.includes(mon))
    {
        pokeArr.push(mon);
    }
    localStorage.setItem('Favorites', JSON.stringify(pokeArr))
}

function removeFav(mon: string)
{
    let pokeData = getFav()
    let index = pokeData.indexOf(mon)
    pokeData.splice(index, 1)
    localStorage.setItem('Favorites', JSON.stringify(pokeData))
}

export { getFav, saveFav, removeFav }