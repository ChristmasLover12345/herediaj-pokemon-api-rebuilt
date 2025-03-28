'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getFav, saveFav } from '../Services/LocalStorage';


const MainContent = (props: { setFavs: Dispatch<SetStateAction<string[]>>; currentMon: string; pokemonFunc: (pokemon: string) => void, elementData: string, nameData: string, locationData: string, abilitiesData: string[], movesData: string[]; normalImg: string; shinyImg: string; evoData: string[]; }) => {

    const [imageBool, setImageBool] = useState<boolean>(true)
    const [shinyText, setShinyText] = useState<string>("Shiny")

    const switchHandle = () => {
        if (imageBool)
        {setShinyText("Normal")}
        else
        {setShinyText("Shiny")}

        setImageBool(!imageBool)
      
        
    }

    const FavBtn = () => {
        saveFav(props.currentMon)
        props.setFavs(getFav)
    }

    useEffect(() => {

    setImageBool(true)
    setShinyText("Shiny")

    },[props.nameData])

    
  return (
  
    
    <div className="h-full w-full col-start-2 row-start-2 border-[12px] rounded-[5px] border-white bg-[#98CB98] relative overflow-scroll md:overflow-hidden flex flex-col items-center md:grid md:grid-cols-[50%_50%] lg:grid-cols-20 md:grid-rows-15">
    {/* <!-- Animation --> */}
    <div className="scanline"></div>
    {/* <!-- imgae --> */}
    <img className="mt-3 mb-3 md:mt-0 md:mb-0 md:h-full md:w-full h-[200px] w-[250px] md:col-start-1 lg:col-start-2 lg:col-end-7 md:row-start-1 md:row-end-5 lg:row-start-2 lg:row-end-7" src={imageBool ? props.normalImg : props.shinyImg} alt="pokemon Image" />
    {/* <!-- Shiny toggle --> */}
    <button onClick={switchHandle} className="bg-[#BF0606] text-[40px] md:text-[38px] text-white text-center w-[90%] lg:w-full md:h-[95%] lg:h-full md:justify-self-center self-center rounded-[5px] mb-3 md:mb-0 md:col-start-1 lg:col-start-2 lg:col-end-7 md:row-start-5 lg:row-start-14">{shinyText}</button>
    {/* <!-- add to favorites button --> */}
    <button onClick={() => FavBtn()} className="bg-[#BF0606] text-[40px] text-white text-center w-[90%] lg:w-full md:justify-self-center self-center rounded-[5px] mb-3 md:mb-0 md:col-start-1 lg:col-start-16 lg:col-end-20 md:row-start-6 md:row-end-8 lg:row-start-13 lg:row-end-15">Add to Favorites</button>
    {/* <!-- Info display texts --> */}
    <div className="text-center lg:text-start md:col-start-2 lg:col-start-2 lg:col-end-7 md:row-start-1 md:row-end-3 lg:row-start-7 lg:row-end-9">

        <h3 className="text-[35px]">Name :</h3>
        <p className="text-[35px] md:text-[30px]">{props.nameData}</p>

    </div>

    <div className="text-center lg:text-start md:col-start-2 lg:col-start-2 lg:col-end-7 md:row-start-3 md:row-end-5 lg:row-start-9 lg:row-end-11">

        <h3 className="text-[35px]">Type :</h3>
        <p className="text-[35px] md:text-[30px]">{ props.elementData}</p>

    </div>

    <div className="text-center lg:text-start mb-3 md:col-start-2 lg:col-start-2 lg:col-end-7 md:row-start-5 md:row-end-8 lg:row-start-11 lg:row-end-14">

        <h3 className="text-[35px]">Found In :</h3>
        <p  className="text-[35px] md:text-[30px]">{props.locationData}</p>

    </div>

    {/* <!-- Move container --> */}
    <div className="flex md:justify-self-center flex-col items-center text-center mb-3 md:mb-0 bg-[#F88E8E] border-2 border-white min-w-[300px] md:min-w-0 min-h-[240px] md:min-h-0 w-[300px] md:w-[90%] lg:w-full h-[240px] md:h-full md:col-start-1 lg:col-start-9 lg:col-end-13 md:row-start-8 md:row-end-11 lg:row-start-2 lg:row-end-7">

        <h2 className="border-b-2 border-[#FF1E1E] text-[40px] w-[90%]">Moves</h2>

        <div className="h-[95%] w-[90%] mb-1 text-center overflow-auto">

            {props.movesData.length > 0 ? (
                props.movesData.map((move, index) => (
                    <p key={index} className='text-[20px] md:text-[25px] lg:text-[30px]'>{move}</p>
                ))
            ) : (
                <p className='m-0 p-0'>no moves</p>
            )}

        </div>

    </div>

    {/* <!-- Ability container --> */}
    <div className="flex md:justify-self-center flex-col items-center text-center mb-3 md:mb-0 bg-[#F88E8E] border-2 border-white min-w-[300px] md:min-w-0 min-h-[240px] md:min-h-0 w-[300px] md:w-[90%] lg:w-full h-[240px] md:h-full md:col-start-2 md:row-start-8 lg:col-start-16 lg:col-end-20 md:row-end-11 lg:row-start-2 lg:row-end-7">

        <h2 className="border-b-2 border-[#FF1E1E] text-[40px] w-[90%]">Abilities</h2>

        <div  className="h-[95%] w-[90%] mb-1 text-center overflow-auto">

        {props.abilitiesData.length > 0 ? (
                props.abilitiesData.map((move, index) => (
                    <p key={index} className='text-[20px] md:text-[25px] lg:text-[30px]'>{move}</p>
                ))
            ) : (
                <p className='m-0 p-0'>no abilities</p>
            )}

        </div>

    </div>

    {/* <!-- Evolutions container --> */}
    <div className="flex flex-col items-center text-center mb-3 md:mb-0 bg-[#F88E8E] border-2 border-white min-w-[300px] md:min-w-0 min-h-[280px] md:min-h-0 w-[300px] h-[280px] md:w-[95%] lg:w-full md:h-[90%] lg:h-full lg:col-start-9 lg:col-end-20 md:row-start-11 md:row-end-16 lg:row-start-8 lg:row-end-12 md:col-span-2  justify-self-center">

        <h2 className="text-[40px] w-[90%]">Evolution path</h2>
        <h2 className="border-b-2 border-[#FF1E1E] mb-1 text-[30px] w-[90%] block md:hidden">(Top to bottom)</h2>
        <h2 className="border-b-2 border-[#FF1E1E] mb-1 text-[30px] w-[90%] hidden md:block">(Left to Right)</h2>

        <div  className="h-[95%] w-[90%] mb-1 text-center flex flex-col md:flex-row justify-center items-center overflow-auto">
            {/* <!-- Evolutions will generate inside this div --> */}

            {props.evoData.length > 0 ? (
                props.evoData.map((name, index) => (
                    <p onClick={() => props.pokemonFunc(name)} key={index} className='bg-[#BF0606] text-[20px] md:text-[25px] lg:text-[30px] text-white p-[5px] mt-0 ml-0 mr-[6px] mb-[2px] border-2 border-black max-w-[200px] max-h-[60px] text-center rounded-[5px]'>{name}</p>
                ))
            ) : ( 
                <p className='p-0 m-0'></p>
            )}

        </div>

    </div>



</div>


  )
}

export default MainContent