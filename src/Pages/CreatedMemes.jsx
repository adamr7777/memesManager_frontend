import React from 'react'; 

import Sidebar from '../Components/Sidebar';
import MemesList from '../Components/MemesList';


import useCreatedMemes from '../customHooks/useCreatedMemes';




export default function CreatedMemes() {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <Sidebar/>
                <MemesList customHook={useCreatedMemes}/>
            </div>      
        </div>
    );
};