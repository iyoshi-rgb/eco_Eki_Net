import './compornent.css'
import { IconContext } from 'react-icons';
import { BsTrainFront } from "react-icons/bs";
import { BsFillHouseFill } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { CiCoins1 } from "react-icons/ci";
import { LuLeaf } from "react-icons/lu";

function Footer(){
    return(
    <div className='button-container'>
        <footer>
        <IconContext.Provider value={{ color: '#5EE030', size: '150px' }}>
            <BsFillHouseFill />
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