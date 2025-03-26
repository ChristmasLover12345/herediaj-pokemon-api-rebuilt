import { useState } from "react";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";

 
export default function Home() {
  const [pmName, setPmName] = useState("");
  const [pmLocation, setPmLocation] = useState("");
  const [pmElement, setPmElement] = useState("");
  const [pmImg, setPmImg] = useState("");
  const [pmAbilities, setPmAbilities] = useState("");
  const [pmMoves, setPmMoves] = useState("");
  const [normalUrl, setNormalUrl] = useState("");
  const [shinyUrl, setShinyUrl] = useState("");
  

  const [currentPokemon, setCurrentPokemon] = useState("");

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
    setPmImg("/king-von-rapper.gif")
    setPmAbilities("")
    setPmMoves("")
    return
  }
  else
  {
    setCurrentPokemon(pokeInfo.name)
  }

  setNormalUrl(pokeInfo.sprites.front_default)
  setShinyUrl(pokeInfo.sprites.front_shiny)

  setPmImg(pokeInfo.sprites.front_default)
  setPmName(pokeInfo.name)

  const locationData = await fetch(pokeInfo.location_area_encounters)
  const locations = await locationData.json()

  if (locations == null || locations == "")
  { setPmLocation("N/A") }
  else
  { setPmLocation(locations[rng(0, locations.length - 1)].location_area.name) }


 }

  return (
    <div className="bg-[#FF0000] h-screen w-screen grid grid-cols-[5%_90%_5%] lg:grid-cols-[2%_96%_2%] grid-rows-[15%_auto_3%]">

    <Navbar />

    <MainContent />

    </div>
  );
}
