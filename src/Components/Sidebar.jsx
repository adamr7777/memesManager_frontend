import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import './Sidebar.css'

export default function Sidebar() {
    return (
        <div className='col-3 sidebar'>
            <ul className='nav flex-column'>
                <li className='nav-item'>
                    <NavLink className='nav-link' activeclassname='active' to='/library' 
                        >Liked Memes
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' activeclassname='active' to='/favoriteMemes' 
                        >Favorite Memes
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' activeclassname='active' to='/uploadedMemes'>Uploaded Memes</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' activeclassname='active' to='/createdMemes'>Created Memes</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' activeclassname='active' to='/commentedMemes'>Commented Memes</NavLink>
                </li>
            </ul>
        </div>
    );
};







