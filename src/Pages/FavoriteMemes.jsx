import React from 'react'; 

import Sidebar from '../Components/Sidebar';
import MemesList from '../Components/MemesList';


import useLibrary from '../customHooks/useLibrary';




export default function FavoriteMemes() {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <Sidebar/>
                <MemesList customHook={()=> useLibrary('favoriteMeme')}/>
            </div>      
        </div>
    );
};