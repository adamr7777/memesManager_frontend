import React, {useState, useContext} from 'react';

import './UserDisplay.css';
import {ContextObj} from './Context';

export default function UserDisplay() {
    const {userHasLoggedIn} = useContext(ContextObj);

    const [UserDisplay, setUserDisplay] = useState(false);
    const [upBtnClicked, setUpBtnClicked] = useState(false);

    const mainStyles = {
        opacity: upBtnClicked? '1' : '0.6',
        position: 'fixed',
        bottom: '5%',
        left: '2%'

    };

    const containerStyles = {
        display: upBtnClicked? 'block' : UserDisplay? 'block' : 'none'
    };

    // const btnUpStyles = {
        
        
    // };
    return (
        <>
            {userHasLoggedIn && <main style={mainStyles}>
                <div style={containerStyles} className='container contact-container'>
                    <h5>user is logged in</h5>
                    <button onClick={()=> console.log('user has logout')} className='btn-logout btn btn-danger btn-block'>
                        logout
                    </button>
                </div>
                <button className='btn-up' 
                onMouseOver={()=> setUserDisplay(true)}
                onMouseOut={()=> setUserDisplay(false)}
                onClick={()=> setUpBtnClicked((prevState)=> !prevState)}>User</button>
            </main>}
        </>
    );
}; 