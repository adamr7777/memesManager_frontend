import React from 'react';
import {Link, useNavigate} from 'react-router-dom';


export default function Header() {
    const navigate = useNavigate();
   
    function resetAll() {
        localStorage.removeItem('memesData');
        localStorage.removeItem('completedMemes');
        navigate('/');
        window.location.reload();
    };

    const fontSize = {fontSize: '13px'};
    


    return (
        <nav className='navbar navbar-expand-sm navbar-light bg-secondary'>
            <div className='container-fluid'>
                <a className='navbar-brand d-inline-block' style={{color: 'brown'}} href='#'>
                    <img src='../icon.png' width='30'/>Memes Manager
                </a>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active' style={fontSize}>
                            <Link className='nav-link text-white' to='/'>Memes Pool</Link>
                        </li>
                        <li className='nav-item active' style={fontSize}>
                            <Link className='nav-link text-white' to='/library'>Memes Library</Link>
                        </li>
                        <li className='nav-item active' style={fontSize}>
                            <Link className='nav-link text-white' to='/createMeme'>Create Your Meme</Link>
                        </li>
                        <li className='nav-item active' style={fontSize}>
                            <Link className='nav-link text-white' to='/upload'>Upload Your Meme</Link>
                        </li>
                    </ul>
                </div>
                <button className='btn btn-danger mx-auto ms-auto-sm' onClick={resetAll}>Reset</button>
                <div>
                    <button 
                        className='navbar-toggler' type='button' 
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarNav'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    ><span className='navbar-toggler-icon'></span></button>
                </div>
            </div>
        </nav>
       
    );
};