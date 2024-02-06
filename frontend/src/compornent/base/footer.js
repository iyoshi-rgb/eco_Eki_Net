import React from 'react';
import './compornent.css'

import { IconContext } from 'react-icons';
import { BsTrainFront } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { BsChatLeftText } from "react-icons/bs";
import { CiCoins1 } from "react-icons/ci";
import { LuLeaf } from "react-icons/lu";

function Footer(){

    return(
    <div className='button-container'>
        <footer>
        <IconContext.Provider value={{ color: '#5EE030', size: '100px' }}>
            <IoHomeOutline />
            <BsTrainFront />
            <CiCoins1 />
            <BsChatLeftText />
            <LuLeaf />
        </IconContext.Provider>
        </footer>
    </div>
    )
}

export default Footer;