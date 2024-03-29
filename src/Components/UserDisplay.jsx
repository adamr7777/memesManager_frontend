import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import './UserDisplay.css';
import {ContextObj} from './Context';


export default function UserDisplay() {
    const {userHasLoggedIn, user, deleteAccount} = useContext(ContextObj);
    
    const [UserDisplay, setUserDisplay] = useState(false);
    const [upBtnClicked, setUpBtnClicked] = useState(false);

    const username = user? user.username : '';
    const navigate = useNavigate();

    const mainStyles = {
        opacity: upBtnClicked? '1' : '0.6',
        position: 'fixed',
        bottom: '5%',
        left: '2%'

    };

    const containerStyles = {
        display: upBtnClicked? 'block' : UserDisplay? 'block' : 'none'
    };


    const handleLogout = ()=> {
        localStorage.removeItem('userData');
        navigate('/');
        window.location.reload();
    };

    const handleDelete = async ()=> {
        const result = window.confirm('Are you sure you want to permamently delete your account?');
        if(!result) return;
        const data = await deleteAccount();
        if(data.msg === 'success!') {
            alert(`User ${data.personName} deleted`);
            handleLogout();
        }
        else alert('Error, try again');
    };

    return (
        <>
            {userHasLoggedIn && <main style={mainStyles}>
                <div style={containerStyles} className='container contact-container'>
                    <h5>
                        <span className='text-success'>{username}</span> 
                        <span className='text-lowercase'> logged in</span>
                    </h5>
                    <button onClick={handleLogout} className='btn-logout btn btn-danger btn-block'>
                        logout
                    </button>
                </div>
                <button className='btn-up' 
                onMouseOver={()=> setUserDisplay(true)}
                onMouseOut={()=> setUserDisplay(false)}
                onClick={()=> setUpBtnClicked((prevState)=> !prevState)}>User</button>
                <button className='btn-delete' style={containerStyles} onClick={handleDelete}>Delete your Account</button>
            </main>}
        </>
    );
}; 