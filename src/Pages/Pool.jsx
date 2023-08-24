import React, {useContext} from 'react';

import Meme from '../Components/Meme';
import BackToTopBtn from '../Components/BackToTopBtn';
import {ContextObj} from '../Components/Context';
import LoginModal from '../Components/LoginModal';
import UserDisplay from '../Components/UserDisplay';




export default function Pool() {
    const {memesData} = useContext(ContextObj);
    
    
    const memes = memesData.map((item, index)=> <Meme 
        key={index} 
        index={index}  
        url={item.url}
    />)

    const gridStyles = {
        display: 'grid',
        gridGap: '10px',
        gridAutoRows: '200px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridAutoFlow: 'dense'
    };

    
    
    return (
            <div className='grid-container' style={gridStyles}>
                {memes}
                <BackToTopBtn/>
                <LoginModal/>
                <UserDisplay/> 
            </div>
    );
};