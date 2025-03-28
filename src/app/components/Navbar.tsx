'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { getFav, removeFav } from '../Services/LocalStorage';


const Navbar = (props: {  setFavs: Dispatch<SetStateAction<string[]>>; favs: string[]; pokemonFunc: (pokemon: string | number) => void; rngFunc: (min: number, max: number) => number }) => {
const [dropdown, setDropdown] = useState("hidden")

const DropdownToggle = () => {

    if (dropdown == "hidden")
    {
        setDropdown("block")
    }
    else
    {
        setDropdown("hidden")
    }

}


const RandomBtn = () => {
    props.pokemonFunc(props.rngFunc(0, 649))
}

const removeFavBtn = (mon: string) => {
    removeFav(mon)
    props.setFavs(getFav)
}


const searchBarFunc = (event: React.KeyboardEvent<HTMLInputElement>, search: string) => {

    if (event.key === "Enter")
    {
        props.pokemonFunc(search)
    }

}

  return (
    <div className='w-full h-full col-start-2 flex flex-col md:flex-row justify-center md:justify-between'>
        {/* Random button */}
        <button onClick={() => RandomBtn()} className='bg-[#BF0606] border-2 border-white text-white md:text-[25px] lg:text-[30px] text-center w-[90%] md:w-[30%] self-center md:order-3 h-[40px] md:h-[60px] rounded-[5px] mb-1 md:mx-2'>Random</button>
        {/* Dropdown container */}
        <div className='w-[90%] md:w-[30%] h-[40px] mb-1 md:mx-2 md:h-[60px] self-center relative md:order-2 inline-block'>
            {/* Dropdown toggle */}
            <button onClick={DropdownToggle} className='w-full h-full md:text-[25px] border-2 border-white lg:text-[30px] bg-[#BF0606] text-center rounded-[5px] text-white'>Favorites</button>
            {/* Dropdown container 2 */}
            <div className={`${dropdown}  absolute flex justify-center left-[-5%] z-10 rounded-[5px] border-4 border-red-500 min-h-[200px] min-w-[110%]  max-h-[300px] bg-[#BF0606]`}>

                <div className='border-[4px] rounded-[5px] border-white bg-[#98CB98] min-h-[97%] min-w-[97%]  overflow-y-scroll flex flex-col flex-grow items-center justify-center'>

                    {props.favs.length > 0 ? (
                        props.favs.map((name, index) => (
                            <div key={index} className='bg-[#D9D9D9] flex w-[95%] h-[80px] justify-between rounded-[5px] border-2 border-black mb-[5px]'>

                            <p onClick={() => props.pokemonFunc(name)} className='text-black text-[40px] m-0 truncate h-full self-center w-full'>{name}</p>

                            <p onClick={() => removeFavBtn(name)} className='border-s-2 text-[#FF1E1E] h-full m-0 text-[40px] px-[5px] self-center'>X</p>

                            </div>
                        ))
                    ) : (
                        <p className='p-0 m-0'></p>
                    )}

                </div>

            </div>

        </div>

        <input onKeyUp={(event) => searchBarFunc(event, event.currentTarget.value)} placeholder="search" type="text" className="bg-white border-2 md:mx-2 md:h-[60px] rounded-[5px] text-center text-black text-[30px] border-[#BF0606] w-[90%] md:w-[30%] h-[40px] self-center md:order-1" />

    </div>
  )
}

export default Navbar