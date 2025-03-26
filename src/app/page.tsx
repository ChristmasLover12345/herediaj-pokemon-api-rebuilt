import { useState } from "react";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";

 
export default function Home() {


 const GetInfo = async (userMon: string ) => {
  const [pmName, setPmName] = useState("");
  const [pmLocation, setPmLocation] = useState("");
  const [pmElement, setPmElement] = useState("");
  const [pmImg, setPmImg] = useState("");
  const [pmAbilities, setPmAbilities] = useState("");
  const [pmMoves, setPmMoves] = useState("");

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
    
  }

 }

  return (
    <div className="bg-[#FF0000] h-screen w-screen grid grid-cols-[5%_90%_5%] lg:grid-cols-[2%_96%_2%] grid-rows-[15%_auto_3%]">

    <Navbar />

    <MainContent />

    </div>
  );
}
