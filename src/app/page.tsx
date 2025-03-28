'use client'

import { useState } from "react";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import { pokemonFetch } from "./Services/DataService";
import { EvolutionChain } from "./interface";

 
export default function Home() {
  const [pmName, setPmName] = useState("");
  const [pmLocation, setPmLocation] = useState("");
  const [pmElement, setPmElement] = useState("");
  
  const [pmAbilities, setPmAbilities] = useState<string[]>([]);
  const [pmMoves, setPmMoves] = useState<string[]>([]);
  const [normalUrl, setNormalUrl] = useState("");
  const [shinyUrl, setShinyUrl] = useState("");
  

  const [currentPokemon, setCurrentPokemon] = useState("");
  const [evolutionData, setEvolutionData] = useState<string[]>([])

  const rng = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
  
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

 const GetInfo = async (userMon: string ) => {
 
  const pokeInfo = await pokemonFetch(userMon)

  if (pokeInfo.id > 649)
  {
    setPmName("gen 1 - 5 only")
    setPmLocation("gen 1 - 5 only")
    setPmElement("gen 1 - 5 only")
    setNormalUrl("/king-von-rapper.gif")
    setPmAbilities([""])
    setPmMoves([""])
    setEvolutionData([])
    return
  }
  else
  {
    setCurrentPokemon(pokeInfo.name)
  }

  setNormalUrl(pokeInfo.sprites.front_default)
  setShinyUrl(pokeInfo.sprites.front_shiny)

  setPmName(pokeInfo.name)
  setPmElement(pokeInfo.types.map((typeObj: { type: { name: string; }; }) => typeObj.type.name).join(", "))
  setPmAbilities(pokeInfo.abilities.map((abilityObj: { ability: { name: string; }; }) => abilityObj.ability.name));
  setPmMoves(pokeInfo.moves.map((moveObj: { move: { name: string; }; }) => moveObj.move.name))

  const locationData = await fetch(pokeInfo.location_area_encounters)
  const locations = await locationData.json()

  if (locations == null || locations == "")
  { setPmLocation("N/A") }
  else
  { setPmLocation(locations[rng(0, locations.length - 1)].location_area.name) }

  // REMEMBER TO DO THIS ON FRIDAY
  const speciesData = await fetch(pokeInfo.species.url)
  const speciesChain = await speciesData.json()
  const evoData = await fetch(speciesChain.evolution_chain.url)
  if (!evoData.ok)
  {
   
  }
  else
  {
    const evoChain = await evoData.json()
    const evolutions = evoChain.chain

    if (!evolutions.evolves_to.length)
    {
      
    }
    else
    {
      let evolutionArray: string[] = []

      const getEvos = (evoChain: EvolutionChain ) => {
        if(!evoChain) return

        evolutionArray.push(evoChain.species.name);
        evoChain.evolves_to.forEach(getEvos);
      }

      getEvos(evolutions)

      setEvolutionData(evolutionArray)

    }

  }
  // REMEMBER TO DO THIS ON FRIDAY



 }

  return (
    <div className="bg-[#FF0000] h-screen w-screen grid grid-cols-[5%_90%_5%] lg:grid-cols-[2%_96%_2%] grid-rows-[15%_auto_3%]">

    <Navbar pokemonFunc={GetInfo}/>

    <MainContent pokemonFunc={GetInfo} elementData={ pmElement } nameData={pmName} locationData={pmLocation} abilitiesData={pmAbilities} movesData={pmMoves} normalImg={normalUrl} shinyImg={shinyUrl} evoData={evolutionData} />

    </div>
  );
}
